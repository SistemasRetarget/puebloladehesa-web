"""Seed inicial del modelo `pueblo-home` en Builder.io con todo el contenido del landing."""
import urllib.request, json, uuid, sys

PRIVATE_KEY = "bpk-33ac6a5cd3ae4c6081851943b3f76a17"
PUBLIC_KEY  = "20aec2e2db69478da3bc634785cb696c"
MODEL_NAME  = "pueblo-home"
PREVIEW_URL = "https://puebloladehesa-web-635392253567.europe-west1.run.app"

VIDEO_URL  = "https://puebloladehesa.cl/cdn/shop/videos/c/vp/a3a8edd156e34c45905c3a7f5f87c3d9/a3a8edd156e34c45905c3a7f5f87c3d9.HD-1080p-4.8Mbps-64810913.mp4"
POSTER_URL = "https://puebloladehesa.cl/cdn/shop/files/preview_images/a3a8edd156e34c45905c3a7f5f87c3d9.thumbnail.0000000000_1400x.jpg"

CDN = "https://puebloladehesa.cl/cdn/shop/files"

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

def Video(src, poster=None, styles_lg=None):
    return Element(
        styles_lg={"position":"absolute","top":"0","left":"0","width":"100%","height":"100%","zIndex":"1", **(styles_lg or {})},
        component={"name":"Video","options":{
            "video":src, "posterImage":poster,
            "autoPlay":True, "muted":True, "loop":True,
            "playsInline":True, "controls":False,
            "fit":"cover", "position":"center", "lazy":False
        }}
    )

# ─── SECCIÓN 1 — HERO con VIDEO ──────────────────────────────────────────
def hero_section():
    return Box(
        tag="section",
        styles_lg={"position":"relative","height":"100vh","minHeight":"600px","overflow":"hidden","marginTop":"-80px"},
        styles_md={"marginTop":"-128px"},
        children=[
            Video(VIDEO_URL, POSTER_URL),
            Box(styles_lg={"position":"absolute","top":"0","left":"0","right":"0","bottom":"0",
                "background":"linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)",
                "zIndex":"2"}),
            Box(styles_lg={"position":"relative","zIndex":"3","height":"100%","display":"flex","flexDirection":"column",
                "alignItems":"center","justifyContent":"flex-end","textAlign":"center",
                "padding":"0 24px 96px 24px","color":"white"},
                styles_sm={"padding":"0 16px 64px 16px"},
                children=[
                    Text("Tu refugio en la ciudad", tag="h1",
                        styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"72px","fontWeight":"300",
                            "lineHeight":"1.1","maxWidth":"900px","color":"white","margin":"0"},
                        styles_md={"fontSize":"56px"}, styles_sm={"fontSize":"40px"}),
                    Text("Arriendo de casas amobladas inmersas en la naturaleza con vistas a la cordillera y al valle de la Dehesa.", tag="p",
                        styles_lg={"marginTop":"24px","fontSize":"18px","maxWidth":"560px",
                            "opacity":"0.95","lineHeight":"1.6","color":"white"},
                        styles_sm={"fontSize":"16px"})
                ])
        ])

# ─── SECCIÓN 2 — NARRATIVA ──────────────────────────────────────────────
def narrativa_section():
    return Box(tag="section",
        styles_lg={"maxWidth":"1280px","margin":"0 auto","padding":"96px 24px","textAlign":"center"},
        styles_sm={"padding":"64px 16px"},
        children=[
            Text("Pueblo nace de la idea de volver a lo esencial.", tag="h2",
                styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"56px","fontWeight":"300",
                    "lineHeight":"1.15","maxWidth":"900px","margin":"0 auto 32px"},
                styles_md={"fontSize":"44px"}, styles_sm={"fontSize":"32px"}),
            Text("Un lugar donde la naturaleza, el diseño y la calma se cruzan para crear un nuevo sentido de habitar la ciudad. Aquí cada casa se piensa como un refugio integrado al entorno, con la cordillera como horizonte y el ritmo del valle como telón de fondo.",
                styles_lg={"fontSize":"18px","lineHeight":"1.8","color":"#6B6B6B","maxWidth":"720px","margin":"0 auto"})
        ])

# ─── SECCIÓN 3 — PILARES (3 columns) ────────────────────────────────────
def pilares_section():
    pilares = [
        ("Naturaleza","Casas integradas al paisaje, con luz natural y vistas a la cordillera."),
        ("Diseño","Arquitectura pensada para vivir con calma y privacidad."),
        ("Calma","Un ritmo distinto, lejos del ruido, sin salir de Santiago."),
    ]
    cards = [
        Box(styles_lg={"flex":"1","padding":"32px 24px","textAlign":"center"},
            children=[
                Text(t, tag="h3", styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"28px","fontWeight":"300","marginBottom":"16px"}),
                Text(d, styles_lg={"fontSize":"15px","lineHeight":"1.7","color":"#6B6B6B","margin":"0"})
            ])
        for t, d in pilares
    ]
    return Box(tag="section",
        styles_lg={"backgroundColor":"#F5F1EA","padding":"96px 24px"},
        styles_sm={"padding":"64px 16px"},
        children=[
            Box(styles_lg={"maxWidth":"1280px","margin":"0 auto","display":"flex","gap":"24px","flexWrap":"wrap"},
                styles_sm={"flexDirection":"column"}, children=cards)
        ])

# ─── SECCIÓN 4 — IMAGEN + TEXTO ──────────────────────────────────────────
def imagen_texto_section():
    return Box(tag="section",
        styles_lg={"maxWidth":"1280px","margin":"0 auto","padding":"96px 24px","display":"grid","gridTemplateColumns":"1fr 1fr","gap":"64px","alignItems":"center"},
        styles_md={"gridTemplateColumns":"1fr","gap":"40px"},
        styles_sm={"padding":"64px 16px"},
        children=[
            Box(styles_lg={"aspectRatio":"4/3","position":"relative","overflow":"hidden"},
                children=[Image(f"{CDN}/Locacion_AEREA_1_1_38dd9d39-992c-4897-9b6f-cd9711af23fb.webp", "Vista panorámica del valle")]),
            Box(children=[
                Text("Un lugar para quedarte el tiempo que necesites", tag="h2",
                    styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"48px","fontWeight":"300","lineHeight":"1.15","marginBottom":"24px"},
                    styles_sm={"fontSize":"32px"}),
                Text("Arriendo de casas amobladas integradas al paisaje, con luz natural y vistas a la cordillera.",
                    styles_lg={"fontSize":"16px","lineHeight":"1.8","color":"#6B6B6B","marginBottom":"16px"}),
                Text("Como en todo pueblo, hay un punto de encuentro: La Casita, un espacio para un café, algo rico para comer, para trabajar con calma o simplemente cruzarse con otros de manera natural.",
                    styles_lg={"fontSize":"16px","lineHeight":"1.8","color":"#6B6B6B","marginBottom":"16px"}),
                Text("Con un equipo atento, arriendo flexible y una ubicación privilegiada —cerca de todo, envuelta en silencio— Pueblo propone una forma de vivir simple, conectada y tranquila desde el primer día.",
                    styles_lg={"fontSize":"16px","lineHeight":"1.8","color":"#6B6B6B","margin":"0"})
            ])
        ])

# ─── SECCIÓN 5 — CASAS GRID (4 cards) ────────────────────────────────────
def casas_section():
    CASAS = [
        {"slug":"casa-doble-altura","name":"Casa Doble Altura","specs":"2 HABITACIONES / 2,5 BAÑOS",
         "desc":"Dos niveles y doble altura, pensada para vivir con mayor amplitud y privacidad entre ambientes.",
         "img":f"{CDN}/07A1871_870b59a3-cea5-46af-a04f-16711cf0bdd6_1.webp"},
        {"slug":"casa-parque","name":"Casa Parque","specs":"2 HABITACIONES / 2 BAÑOS",
         "desc":"Un primer piso que se abre al parque, con la terraza como extensión natural de la casa.",
         "img":f"{CDN}/07A9319_9e57ed7b-b137-4536-ae8e-abfc85a8aeec_1.webp"},
        {"slug":"casa-panoramica","name":"Casa Panorámica","specs":"2 HABITACIONES / 2 BAÑOS",
         "desc":"Un segundo piso con vistas abiertas a la cordillera y mayor sensación de perspectiva.",
         "img":f"{CDN}/07A0248.jpg"},
        {"slug":"casa-suite","name":"Casa Suite","specs":"1 HABITACIÓN / 1,5 BAÑOS",
         "desc":"Un dormitorio, con la mayor amplitud interior y una experiencia más abierta y protagónica.",
         "img":f"{CDN}/IMG_0011_1.webp"},
    ]
    cards = [
        Box(link_url=f"/casas/{c['slug']}",
            styles_lg={"display":"block","textDecoration":"none","color":"inherit"},
            children=[
                Box(styles_lg={"position":"relative","aspectRatio":"1/1","overflow":"hidden","backgroundColor":"#F5F1EA","marginBottom":"20px"},
                    children=[Image(c["img"], c["name"])]),
                Text(c["name"], tag="h3", styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"24px","fontWeight":"300","marginBottom":"8px"}),
                Text(c["specs"], styles_lg={"fontSize":"11px","letterSpacing":"2px","color":"#6B6B6B","marginBottom":"12px","textTransform":"uppercase"}),
                Text(c["desc"], styles_lg={"fontSize":"13px","lineHeight":"1.7","color":"#6B6B6B","marginBottom":"16px"}),
                Text("ver más →", styles_lg={"fontSize":"13px","color":"#1A1A1A"})
            ])
        for c in CASAS
    ]
    return Box(tag="section",
        styles_lg={"maxWidth":"1280px","margin":"0 auto","padding":"96px 24px"},
        styles_sm={"padding":"64px 16px"},
        children=[
            Box(styles_lg={"textAlign":"center","marginBottom":"64px"},
                children=[
                    Text("Espacios para quedarse", tag="h2",
                        styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"56px","fontWeight":"300","marginBottom":"16px"},
                        styles_sm={"fontSize":"40px"}),
                    Text("Cada casa propone una experiencia distinta, unida por la luz, el diseño y la calma del entorno.",
                        styles_lg={"fontSize":"17px","color":"#6B6B6B","maxWidth":"640px","margin":"0 auto","lineHeight":"1.6"})
                ]),
            Box(styles_lg={"display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"24px"},
                styles_md={"gridTemplateColumns":"repeat(2, 1fr)"},
                styles_sm={"gridTemplateColumns":"1fr"},
                children=cards)
        ])

# ─── SECCIÓN 6 — CTA ESTADÍAS ────────────────────────────────────────────
def cta_section():
    return Box(tag="section",
        styles_lg={"backgroundColor":"#F5F1EA","padding":"96px 24px","textAlign":"center"},
        styles_sm={"padding":"64px 16px"},
        children=[
            Box(styles_lg={"maxWidth":"720px","margin":"0 auto"},
                children=[
                    Text("Estadías flexibles", tag="h2",
                        styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"56px","fontWeight":"300","marginBottom":"24px"},
                        styles_sm={"fontSize":"40px"}),
                    Text("Reserva para nuestras estadías de corto, mediano y largo plazo.",
                        styles_lg={"fontSize":"17px","color":"#6B6B6B","marginBottom":"40px","lineHeight":"1.6"}),
                    Box(styles_lg={"display":"flex","gap":"16px","justifyContent":"center","flexWrap":"wrap"},
                        children=[
                            Box(link_url="https://puebloladehesa.book2dream.com/",
                                styles_lg={"display":"inline-block","padding":"16px 40px","backgroundColor":"#C8551F","color":"white","borderRadius":"999px","fontSize":"14px","textDecoration":"none","fontWeight":"500"},
                                children=[Text("Reservar", styles_lg={"color":"white","margin":"0"})]),
                            Box(link_url="/contacto",
                                styles_lg={"display":"inline-block","padding":"16px 40px","border":"1px solid #1A1A1A","color":"#1A1A1A","borderRadius":"999px","fontSize":"14px","textDecoration":"none"},
                                children=[Text("Contáctanos", styles_lg={"color":"#1A1A1A","margin":"0"})])
                        ])
                ])
        ])

# ─── SECCIÓN 7 — EXPERIENCIAS GRID ───────────────────────────────────────
def experiencias_section():
    EXPS = [
        ("Naturaleza","Cabalgatas al atardecer", f"{CDN}/Cabalgata.png"),
        ("Naturaleza","Trekking en cordillera", f"{CDN}/trekking_1.webp"),
        ("Pausa","Jardín y silencio", f"{CDN}/Jardin_07A9818_1.webp"),
        ("Comunidad","Vida compartida", f"{CDN}/vida_en_comunidad_07A0078_1_7bdc8b09-9b68-4924-a72c-3bea87f72e31.webp"),
    ]
    cards = [
        Box(styles_lg={"position":"relative","aspectRatio":"1/1","overflow":"hidden","backgroundColor":"#F5F1EA"},
            children=[
                Image(img, title),
                Box(styles_lg={"position":"absolute","bottom":"0","left":"0","right":"0","padding":"16px",
                    "background":"linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5))"},
                    children=[
                        Text(tag_, styles_lg={"fontSize":"10px","letterSpacing":"2px","color":"rgba(255,255,255,0.8)","textTransform":"uppercase","margin":"0 0 4px"}),
                        Text(title, tag="p", styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"18px","color":"white","fontWeight":"300","lineHeight":"1.2","margin":"0"})
                    ])
            ])
        for tag_, title, img in EXPS
    ]
    return Box(tag="section",
        styles_lg={"backgroundColor":"#F5F1EA","padding":"96px 24px"},
        styles_sm={"padding":"64px 16px"},
        children=[
            Box(styles_lg={"maxWidth":"1280px","margin":"0 auto"},
                children=[
                    Box(styles_lg={"marginBottom":"48px"},
                        children=[
                            Text("Experiencias que le dan vida a Pueblo", tag="h2",
                                styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"56px","fontWeight":"300","lineHeight":"1.15","marginBottom":"24px","maxWidth":"800px"},
                                styles_sm={"fontSize":"36px"}),
                            Text("Además de disfrutar en Pueblo, organizamos experiencias en tres mundos —naturaleza, pausa y comunidad— que nacen en Pueblo y se expanden hacia su entorno: desde caminatas, clases de yoga, hasta exploraciones que conectan la cordillera, los centros de ski y la costa.",
                                styles_lg={"fontSize":"17px","color":"#6B6B6B","lineHeight":"1.7","maxWidth":"720px"})
                        ]),
                    Box(styles_lg={"display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"16px"},
                        styles_md={"gridTemplateColumns":"repeat(2, 1fr)"},
                        children=cards)
                ])
        ])

# ─── SECCIÓN 8 — QUOTE PARALLAX ──────────────────────────────────────────
def quote_section():
    return Box(tag="section",
        styles_lg={"position":"relative","height":"70vh","minHeight":"500px","overflow":"hidden"},
        children=[
            Image(f"{CDN}/07A1871_870b59a3-cea5-46af-a04f-16711cf0bdd6_1.webp", "Pueblo con vista a cordillera",
                styles_lg={"position":"absolute","inset":"0","width":"100%","height":"100%"}),
            Box(styles_lg={"position":"absolute","inset":"0","background":"linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2), transparent)"}),
            Box(styles_lg={"position":"relative","height":"100%","display":"flex","alignItems":"center","padding":"0 64px"},
                styles_sm={"padding":"0 24px"},
                children=[
                    Text("La vida de pueblo que hoy buscamos, con naturaleza y calma, sin salir de la ciudad", tag="p",
                        styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"56px","color":"white","fontWeight":"300","lineHeight":"1.2","maxWidth":"700px","margin":"0"},
                        styles_md={"fontSize":"40px"}, styles_sm={"fontSize":"28px"})
                ])
        ])

# ─── SECCIÓN 9 — VIDA EN PUEBLO ──────────────────────────────────────────
def vida_section():
    return Box(tag="section",
        styles_lg={"padding":"96px 24px"},
        styles_sm={"padding":"64px 16px"},
        children=[
            Box(styles_lg={"maxWidth":"1280px","margin":"0 auto"},
                children=[
                    Box(styles_lg={"textAlign":"center","marginBottom":"48px"},
                        children=[
                            Text("Vida en Pueblo", tag="h2",
                                styles_lg={"fontFamily":"'Cormorant Garamond', serif","fontSize":"48px","fontWeight":"300","marginBottom":"16px"},
                                styles_sm={"fontSize":"32px"}),
                            Text("Espacios pensados para habitar con calma, integrados al paisaje de La Dehesa.",
                                styles_lg={"fontSize":"16px","color":"#6B6B6B","maxWidth":"640px","margin":"0 auto"})
                        ]),
                    Box(styles_lg={"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"16px"},
                        styles_sm={"gridTemplateColumns":"1fr"},
                        children=[
                            Box(styles_lg={"aspectRatio":"4/3","overflow":"hidden","backgroundColor":"#F5F1EA"},
                                children=[Image(f"{CDN}/07A0373_1_9306cd35-d2d4-4c49-b3de-55aa005f487c.webp", "Interior con vista a cordillera")]),
                            Box(styles_lg={"aspectRatio":"4/3","overflow":"hidden","backgroundColor":"#F5F1EA"},
                                children=[Image(f"{CDN}/07A9353_1_1.webp", "Terraza y parque")])
                        ])
                ])
        ])

# ─── BUILD COMPLETO ──────────────────────────────────────────────────────
def build_blocks():
    return [
        hero_section(),
        narrativa_section(),
        pilares_section(),
        imagen_texto_section(),
        casas_section(),
        cta_section(),
        experiencias_section(),
        quote_section(),
        vida_section(),
    ]

def main():
    blocks = build_blocks()
    payload = {
        "name": "Home — Pueblo La Dehesa (ES)",
        "published": "published",
        "query": [{"property":"urlPath","operator":"is","value":"/"}],
        "data": {
            "title": "Pueblo La Dehesa | Casas de Lujo en La Dehesa, Santiago",
            "description": "Descubre casas rodeadas de naturaleza en La Dehesa. Diseño, calma y refugio en la ciudad.",
            "url": "/",
            "blocks": blocks,
        }
    }
    body = json.dumps(payload).encode()
    req = urllib.request.Request(
        f"https://builder.io/api/v1/write/{MODEL_NAME}",
        data=body,
        headers={"Authorization": f"Bearer {PRIVATE_KEY}", "Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as r:
            d = json.loads(r.read())
        if d.get("id"):
            print(f"✅ Content creado")
            print(f"   ID: {d['id']}")
            print(f"   Edit: https://builder.io/content/{d['id']}")
            print(f"   View: {PREVIEW_URL}")
            with open("/tmp/pueblo_home_content_id.txt","w") as f:
                f.write(d['id'])
        else:
            print(json.dumps(d, indent=2)[:1000])
    except urllib.error.HTTPError as e:
        print(f"HTTP {e.code}: {e.read().decode()[:600]}")

if __name__ == "__main__":
    main()
