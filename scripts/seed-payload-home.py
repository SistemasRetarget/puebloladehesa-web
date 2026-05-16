"""Crea la entry 'Home' en Payload Pages — corre DESPUÉS del deploy."""
import urllib.request, json, sys

PAYLOAD_URL = "https://puebloladehesa-web-635392253567.europe-west1.run.app"
EMAIL    = "admin@puebloladehesa.cl"   # AJUSTAR si es otro
PASSWORD = sys.argv[1] if len(sys.argv) > 1 else None

BUILDER_CONTENT_ID = "668bd74ea6e34efabbedaa7b4926d32f"  # Home content en Builder

if not PASSWORD:
    print("Uso: python3 seed-payload-home.py <password_admin>")
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

# 2) Crear o actualizar Home
home_payload = {
    "title": "Home",
    "slug": "home",
    "route": "/",
    "builderContentId": BUILDER_CONTENT_ID,
    "builderModelName": "pueblo-home",
    "meta": {
        "title": "Pueblo La Dehesa | Casas de Lujo en La Dehesa, Santiago",
        "description": "Descubre casas rodeadas de naturaleza en La Dehesa. Diseño, calma y refugio en la ciudad."
    },
    "published": True
}

# Buscar si ya existe
search = urllib.request.Request(
    f"{PAYLOAD_URL}/api/pages?where[slug][equals]=home",
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
        data=json.dumps(home_payload).encode(),
        headers={"Authorization": f"JWT {token}", "Content-Type": "application/json"},
        method="PATCH"
    )
    with urllib.request.urlopen(req) as r:
        d = json.loads(r.read())
    print(f"✅ Home actualizado (id={existing_id})")
else:
    # POST
    req = urllib.request.Request(
        f"{PAYLOAD_URL}/api/pages",
        data=json.dumps(home_payload).encode(),
        headers={"Authorization": f"JWT {token}", "Content-Type": "application/json"},
        method="POST"
    )
    with urllib.request.urlopen(req) as r:
        d = json.loads(r.read())
    print(f"✅ Home creado (id={d.get('doc',{}).get('id')})")
