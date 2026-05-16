"""Crea la entry 'Nosotros' en Payload Pages — corre DESPUÉS del deploy."""
import urllib.request, json, sys

PAYLOAD_URL = "https://puebloladehesa-web-635392253567.europe-west1.run.app"
EMAIL    = "sistemas@retarget.cl"   # Usuario de QA
PASSWORD = sys.argv[1] if len(sys.argv) > 1 else None

# Leer ID de Builder.io del archivo temporal (generado por seed-builder-nosotros.py)
try:
    with open("/tmp/pueblo_nosotros_content_id.txt", "r") as f:
        BUILDER_CONTENT_ID = f.read().strip()
except:
    BUILDER_CONTENT_ID = None  # Se llenará manualmente después de crear en Builder.io

if not PASSWORD:
    print("Uso: python3 seed-payload-nosotros.py <password_admin>")
    sys.exit(1)

# 1) Login → obtener cookie/token
login_body = json.dumps({"email": EMAIL, "password": PASSWORD}).encode()
req = urllib.request.Request(
    f"{PAYLOAD_URL}/api/users/login",
    data=login_body,
    headers={"Content-Type": "application/json"},
    method="POST"
)
with urllib.request.urlopen(req) as r:
    auth = json.loads(r.read())
token = auth.get("token")
print(f"✅ Auth OK (user: {auth.get('user',{}).get('email')})")

# 2) Crear o actualizar Nosotros
nosotros_payload = {
    "title": "Nosotros",
    "slug": "nosotros",
    "route": "/nosotros",
    "builderContentId": BUILDER_CONTENT_ID,
    "builderModelName": "pueblo-nosotros",
    "meta": {
        "title": "Nosotros | Pueblo La Dehesa",
        "description": "La historia detrás de Pueblo La Dehesa: inspirados en la vida de pueblo, la naturaleza y la calma."
    },
    "published": True
}

# Buscar si ya existe
search = urllib.request.Request(
    f"{PAYLOAD_URL}/api/pages?where[slug][equals]=nosotros",
    headers={"Authorization": f"JWT {token}"}
)
with urllib.request.urlopen(search) as r:
    existing = json.loads(r.read())

docs = existing.get("docs", [])
if docs:
    existing_id = docs[0]["id"]
    # PATCH
    req = urllib.request.Request(
        f"{PAYLOAD_URL}/api/pages/{existing_id}",
        data=json.dumps(nosotros_payload).encode(),
        headers={"Authorization": f"JWT {token}", "Content-Type": "application/json"},
        method="PATCH"
    )
    with urllib.request.urlopen(req) as r:
        d = json.loads(r.read())
    print(f"✅ Nosotros actualizado (id={existing_id})")
else:
    # POST
    req = urllib.request.Request(
        f"{PAYLOAD_URL}/api/pages",
        data=json.dumps(nosotros_payload).encode(),
        headers={"Authorization": f"JWT {token}", "Content-Type": "application/json"},
        method="POST"
    )
    with urllib.request.urlopen(req) as r:
        d = json.loads(r.read())
    print(f"✅ Nosotros creado (id={d.get('doc',{}).get('id')})")
