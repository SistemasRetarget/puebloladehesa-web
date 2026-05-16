"""Seed inicial del modelo `pueblo-nosotros` en Builder.io con contenido del landing de Nosotros."""
import urllib.request, json, uuid, sys

PRIVATE_KEY = "bpk-33ac6a5cd3ae4c6081851943b3f76a17"
PUBLIC_KEY  = "20aec2e2db69478da3bc634785cb696c"
MODEL_NAME  = "pueblo-nosotros"
PREVIEW_URL = "https://puebloladehesa-web-635392253567.europe-west1.run.app"

CDN = "https://puebloladehesa.cl/cdn/shop/files"

# Imágenes — deben coincidir EXACTAMENTE con src/lib/shopify-images.ts
IMAGES = {
    "nosotros_hero":     f"{CDN}/Captura_de_pantalla_2025-12-24_a_la_s_11.31.38_a.m._1398x1680.png",
    "nosotros_esencial": f"{CDN}/Inmersion_naturaleza_07A8225.png",
    "nosotros_maureen":  f"{CDN}/Maureen_Morrison_2025-12-18_at_20.34.05.jpg",
}

# ─── HELPERS ─────────────────────────────────────────────────────────────
def el_id(): return f"builder-{uuid.uuid4().hex[:14]}"

def Element(tag=None, styles_lg=None, styles_md=None, styles_sm=None, children=None, component=None, link_url=None, props=None):
    b = {"@type":"@builder.io/sdk:Element", "id":el_id()}
    if tag: b["tagName"] = tag
    if link_url: b["linkUrl"] = link_url
    rs = {}
    if styles_lg: rs["large"] = styles_lg
    if styles_md: rs["medium"] = styles_md
    if styles_sm: rs["small"]  = styles_sm
    if rs: b["responsiveStyles"] = rs
    if children: b["children"] = children
    if component: b["component"] = component
    if props: b.update(props)
    return b

def Box(**kw): return Element(**kw)

def Text(text, tag="p", styles_lg=None, styles_md=None, styles_sm=None):
    return Element(
        tag=tag,
        styles_lg=styles_lg, styles_md=styles_md, styles_sm=styles_sm,
        component={"name":"Text", "options":{"text":text}}
    )

def Image(src, alt="", styles_lg=None, styles_md=None, styles_sm=None, fit="cover"):
    return Element(
        styles_lg={"position":"relative","width":"100%","height":"100%", **(styles_lg or {})},
        styles_md=styles_md, styles_sm=styles_sm,
        component={"name":"Image", "options":{
            "image":src, "altText":alt,
            "backgroundSize":fit, "backgroundPosition":"center",
            "lazy":True, "fitContent":False
        }}
    )

# ─── SECCIÓN 1 — HERO ────────────────────────────────────────────────────────
def hero_section():
    return Box(
        tag="section",
        styles_lg={"position":"relative","height":"70vh","minHeight":"500px","overflow":"hidden","marginTop":"-80px"},
        styles_md={"marginTop":"-128px"},
        children=[
            Box(styles_lg={"position":"absolute","top":"0","left":"0","right":"0","bottom":"0"},
                children=[Image(IMAGES["nosotros_hero"], "Pueblo La Dehesa - Nosotros")]),
            Box(styles_lg={"position":"absolute","top":"0","left":"0","right":"0","bottom":"0",
                "background":"linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)",
                "zIndex":"1"}),
            Box(styles_lg={"position":"relative","zIndex":"2","height":"100%","display":"flex","flexDirection":"column",
                "alignItems":"center","justifyContent":"center","textAlign":"center",
                "padding":"0 24px","color":"white"},
                styles_sm={"padding":"0 16px"},
                children=[
                    Text("Nosotros", tag="p",
                        styles_lg={"fontSize":"13px","letterSpacing":"3px","textTransform":"uppercase","opacity":"0.9","margin":"0 0 16px 0"}),
                    Text("La historia detrás de Pueblo", tag="h1",
                        styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"72px","fontWeight":"300",
                            "lineHeight":"1.1","maxWidth":"900px","color":"white","margin":"0 0 24px 0"},
                        styles_md={"fontSize":"56px"}, styles_sm={"fontSize":"40px"}),
                    Text("Inspirados en la vida de pueblo, la naturaleza y la calma.", tag="p",
                        styles_lg={"marginTop":"0","fontSize":"20px","maxWidth":"560px",
                            "opacity":"0.95","lineHeight":"1.6","color":"white","fontStyle":"italic"},
                        styles_sm={"fontSize":"16px"})
                ])
        ])

# ─── SECCIÓN 2 — PREGUNTA MANIFIESTO ─────────────────────────────────────
def pregunta_section():
    return Box(tag="section",
        styles_lg={"maxWidth":"900px","margin":"0 auto","padding":"96px 24px","textAlign":"center"},
        styles_sm={"padding":"64px 16px"},
        children=[
            Text("¿Y si bajar el ritmo no implicara irse de la ciudad?", tag="h2",
                styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"56px","fontWeight":"300",
                    "lineHeight":"1.15","margin":"0 0 32px 0"},
                styles_md={"fontSize":"44px"}, styles_sm={"fontSize":"32px"}),
            Text("Hoy vivimos rodeados de ruido, tránsito y prisa. Pero todos buscamos, consciente o inconscientemente, un lugar donde ese ritmo pueda cambiar. Ahí comienza Pueblo.",
                styles_lg={"fontSize":"18px","lineHeight":"1.8","color":"#6B6B6B","maxWidth":"720px","margin":"0 auto"})
        ])

# ─── SECCIÓN 3 — QUOTE ARQUITECTO ────────────────────────────────────────
def quote_arquitecto_section():
    return Box(tag="section",
        styles_lg={"backgroundColor":"#F5F1EA","padding":"96px 24px"},
        styles_sm={"padding":"64px 16px"},
        children=[
            Box(styles_lg={"maxWidth":"900px","margin":"0 auto","textAlign":"center"},
                children=[
                    Text('"Propusimos una arquitectura elevada... para que el lugar, la luz y la cordillera dialoguen"', tag="p",
                        styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"32px","fontWeight":"300",
                            "lineHeight":"1.4","margin":"0 0 24px 0","fontStyle":"italic"}),
                    Text("Martin Lira — arquitecto",
                        styles_lg={"fontSize":"13px","letterSpacing":"1px","color":"#6B6B6B","textTransform":"uppercase"})
                ])
        ])

# ─── SECCIÓN 4 — VOLVER A LO ESENCIAL ────────────────────────────────────
def volver_esencial_section():
    return Box(tag="section",
        styles_lg={"maxWidth":"1280px","margin":"0 auto","padding":"96px 24px","display":"grid","gridTemplateColumns":"1fr 1fr","gap":"64px","alignItems":"center"},
        styles_md={"gridTemplateColumns":"1fr","gap":"40px"},
        styles_sm={"padding":"64px 16px"},
        children=[
            Box(styles_lg={"aspectRatio":"4/5","position":"relative","overflow":"hidden","borderRadius":"8px"},
                children=[Image(IMAGES["nosotros_esencial"], "Volver a lo esencial")]),
            Box(children=[
                Text("Volver a lo esencial", tag="h2",
                    styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"48px","fontWeight":"300","lineHeight":"1.15","marginBottom":"32px"},
                    styles_sm={"fontSize":"32px"}),
                Text("Pueblo nace de una idea simple y poderosa: crear un lugar donde la vida se sienta calma y con propósito.",
                    styles_lg={"fontSize":"16px","lineHeight":"1.8","color":"#6B6B6B","marginBottom":"16px"}),
                Text("Imaginamos una forma de vivir más simple, inspirada en la vida de pueblo.",
                    styles_lg={"fontSize":"16px","lineHeight":"1.8","color":"#6B6B6B","marginBottom":"32px"}),
                Box(styles_lg={"display":"flex","flexDirection":"column","gap":"12px"},
                    children=[
                        Text("• Caminar sin apuro", styles_lg={"fontSize":"15px","color":"#6B6B6B"}),
                        Text("• Mirar y sentir la cordillera", styles_lg={"fontSize":"15px","color":"#6B6B6B"}),
                        Text("• Dejar que el entorno acompañe", styles_lg={"fontSize":"15px","color":"#6B6B6B"})
                    ])
            ])
        ])

# ─── SECCIÓN 5 — QUOTE PAISAJISTA ────────────────────────────────────────
def quote_paisajista_section():
    return Box(tag="section",
        styles_lg={"backgroundColor":"#F5F1EA","padding":"96px 24px"},
        styles_sm={"padding":"64px 16px"},
        children=[
            Box(styles_lg={"maxWidth":"900px","margin":"0 auto","textAlign":"center"},
                children=[
                    Text('"Elegimos especies nativas y flores, diseñando un verde que se recorre, se vive y se cuida, acompañado por la cordillera"', tag="p",
                        styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"32px","fontWeight":"300",
                            "lineHeight":"1.4","margin":"0 0 24px 0","fontStyle":"italic"}),
                    Text("Inés Couve — paisajista",
                        styles_lg={"fontSize":"13px","letterSpacing":"1px","color":"#6B6B6B","textTransform":"uppercase"})
                ])
        ])

# ─── SECCIÓN 6 — NUESTRA INSPIRACIÓN (4 pillars) ──────────────────────────
def inspiracion_section():
    pilares = [
        ("La vida de pueblo", "Los encuentros espontáneos, los gestos cotidianos, el centro que reúne."),
        ("La naturaleza como escenario", "Parques de árboles nativos, pasarelas y la cordillera siempre presente."),
        ("Un ritmo más tranquilo", "Días pensados para caminar, encontrarse y vivir sin apuro."),
        ("El diseño bien pensado", "Espacios simples, honestos y cuidados, que se integran al entorno."),
    ]
    cards = [
        Box(styles_lg={"flex":"1","padding":"32px 24px","textAlign":"center"},
            children=[
                Text(t, tag="h3", styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"22px","fontWeight":"300","marginBottom":"16px"}),
                Text(d, styles_lg={"fontSize":"14px","lineHeight":"1.7","color":"#6B6B6B","margin":"0"})
            ])
        for t, d in pilares
    ]
    return Box(tag="section",
        styles_lg={"maxWidth":"1280px","margin":"0 auto","padding":"96px 24px"},
        styles_sm={"padding":"64px 16px"},
        children=[
            Box(styles_lg={"textAlign":"center","marginBottom":"64px"},
                children=[
                    Text("Nuestra inspiración", tag="h2",
                        styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"56px","fontWeight":"300","marginBottom":"16px"},
                        styles_sm={"fontSize":"40px"})
                ]),
            Box(styles_lg={"display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"24px"},
                styles_md={"gridTemplateColumns":"repeat(2, 1fr)"},
                styles_sm={"gridTemplateColumns":"1fr"},
                children=cards)
        ])

# ─── SECCIÓN 7 — QUOTE INTERIORES ─────────────────────────────────────────
def quote_interiores_section():
    return Box(tag="section",
        styles_lg={"backgroundColor":"#F5F1EA","padding":"96px 24px"},
        styles_sm={"padding":"64px 16px"},
        children=[
            Box(styles_lg={"maxWidth":"900px","margin":"0 auto","textAlign":"center"},
                children=[
                    Text('"Pensamos interiores cálidos, nobles y simples. Espacios que se sienten bien y dan ganas de habitar"', tag="p",
                        styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"32px","fontWeight":"300",
                            "lineHeight":"1.4","margin":"0 0 24px 0","fontStyle":"italic"}),
                    Text("Juan Ignacio Court",
                        styles_lg={"fontSize":"13px","letterSpacing":"1px","color":"#6B6B6B","textTransform":"uppercase"})
                ])
        ])

# ─── SECCIÓN 8 — QUOTE MAUREEN ──────────────────────────────────────────────
def quote_maureen_section():
    return Box(tag="section",
        styles_lg={"backgroundColor":"#F5F1EA","padding":"96px 24px"},
        styles_sm={"padding":"64px 16px"},
        children=[
            Box(styles_lg={"maxWidth":"900px","margin":"0 auto","textAlign":"center"},
                children=[
                    Text('"Acompañamos cada estadía con atención y cariño, para que desde el primer día se sientan en casa"', tag="p",
                        styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"32px","fontWeight":"300",
                            "lineHeight":"1.4","margin":"0 0 24px 0","fontStyle":"italic"}),
                    Text("Maureen Morrison — Experiencia Pueblo",
                        styles_lg={"fontSize":"13px","letterSpacing":"1px","color":"#6B6B6B","textTransform":"uppercase"})
                ])
        ])

# ─── SECCIÓN 9 — CTA FINAL ──────────────────────────────────────────────────
def cta_final_section():
    return Box(tag="section",
        styles_lg={"backgroundColor":"#1a1a1a","color":"white","padding":"96px 24px","textAlign":"center"},
        styles_sm={"padding":"64px 16px"},
        children=[
            Text("Vive la experiencia Pueblo", tag="h3",
                styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"48px","fontWeight":"300","marginBottom":"24px"},
                styles_sm={"fontSize":"32px"}),
            Text("Reserva tu estadía y descubre por qué este lugar es único",
                styles_lg={"fontSize":"17px","opacity":"0.9","marginBottom":"32px","maxWidth":"600px","margin":"0 auto 32px auto"}),
            Box(styles_lg={"display":"flex","gap":"16px","justifyContent":"center","flexWrap":"wrap"},
                children=[
                    Box(tag="a", link_url="https://puebloladehesa.book2dream.com/",
                        styles_lg={"display":"inline-block","backgroundColor":"#D7632C","color":"white","padding":"14px 32px","borderRadius":"6px","textDecoration":"none","fontWeight":"600","fontSize":"16px","transition":"background 0.2s"},
                        component={"name":"Text", "options":{"text":"Reservar Ahora"}}),
                    Box(tag="a", link_url="/contacto",
                        styles_lg={"display":"inline-block","border":"1px solid white","color":"white","padding":"14px 32px","borderRadius":"6px","textDecoration":"none","fontWeight":"600","fontSize":"16px","transition":"all 0.2s"},
                        component={"name":"Text", "options":{"text":"Contáctanos"}})
                ])
        ])

# ─── BUILD & UPLOAD ──────────────────────────────────────────────────────────
def build_content():
    return {
        "data": {
            "type": "page",
            "inputs": [],
            "blocks": [
                hero_section(),
                pregunta_section(),
                quote_arquitecto_section(),
                volver_esencial_section(),
                quote_paisajista_section(),
                inspiracion_section(),
                quote_interiores_section(),
                quote_maureen_section(),
                cta_final_section(),
            ]
        }
    }

def create_model():
    """Crear el modelo pueblo-nosotros en Builder.io si no existe."""
    model_payload = {
        "name": "pueblo-nosotros",
        "kind": "page",
        "preview": f"{PREVIEW_URL}/nosotros",
        "description": "Landing page para Nosotros de Pueblo La Dehesa"
    }

    req = urllib.request.Request(
        "https://builder.io/api/v1/models",
        data=json.dumps(model_payload).encode(),
        headers={"Authorization": f"Bearer {PRIVATE_KEY}", "Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req) as r:
            response = json.loads(r.read())
        print(f"✅ Modelo creado: {response.get('name')}")
        return True
    except urllib.error.HTTPError as e:
        error_text = e.read().decode()
        if "already exists" in error_text or "duplicate" in error_text.lower():
            print(f"ℹ️  Modelo ya existe")
            return True
        else:
            print(f"❌ Error creando modelo: {e.code}")
            print(error_text)
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def upload_to_builder():
    # El modelo pueblo-nosotros ya existe en Builder.io (creado desde el dashboard)
    # La API de Builder.io no permite crear modelos via API privada
    print(f"ℹ️  Usando modelo existente: {MODEL_NAME}")

    payload = build_content()

    # POST a Builder.io
    req = urllib.request.Request(
        f"https://builder.io/api/v1/write/{MODEL_NAME}",
        data=json.dumps(payload).encode(),
        headers={"Authorization": f"Bearer {PRIVATE_KEY}", "Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req) as r:
            response = json.loads(r.read())

        content_id = response.get("data", {}).get("id")
        if content_id:
            # Guardar el ID para que lo use el seed de Payload
            with open("/tmp/pueblo_nosotros_content_id.txt", "w") as f:
                f.write(content_id)
            print(f"✅ Contenido pueblo-nosotros creado en Builder.io (id={content_id})")
            print(f"   Próximo paso: python3 seed-payload-nosotros.py <password_admin>")
        else:
            print("❌ Error: No se obtuvo content_id")
            print(response)
    except urllib.error.HTTPError as e:
        print(f"❌ Error HTTP: {e.code}")
        print(e.read().decode())
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    upload_to_builder()
