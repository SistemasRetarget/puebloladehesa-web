"""Seed v2 del modelo `pueblo-home` — fiel al home de producción puebloladehesa.cl"""
import urllib.request, json, uuid

PRIVATE_KEY = "bpk-33ac6a5cd3ae4c6081851943b3f76a17"
MODEL_NAME  = "pueblo-home"
CONTENT_ID  = "668bd74ea6e34efabbedaa7b4926d32f"
PREVIEW_URL = "https://puebloladehesa-web-635392253567.europe-west1.run.app"

VIDEO_URL  = "https://puebloladehesa.cl/cdn/shop/videos/c/vp/a3a8edd156e34c45905c3a7f5f87c3d9/a3a8edd156e34c45905c3a7f5f87c3d9.HD-1080p-4.8Mbps-64810913.mp4"
POSTER_URL = "https://puebloladehesa.cl/cdn/shop/files/preview_images/a3a8edd156e34c45905c3a7f5f87c3d9.thumbnail.0000000000_1400x.jpg"
CDN = "https://puebloladehesa.cl/cdn/shop/files"
BANER_URL = f"{CDN}/baner.webp"

# ─── HELPERS ────────────────────────────────────────────────────────────
def el_id(): return f"builder-{uuid.uuid4().hex[:14]}"

def E(tag=None, lg=None, md=None, sm=None, children=None, component=None, link=None):
    b = {"@type":"@builder.io/sdk:Element", "id":el_id()}
    if tag: b["tagName"] = tag
    if link: b["linkUrl"] = link
    rs = {}
    if lg: rs["large"] = lg
    if md: rs["medium"] = md
    if sm: rs["small"] = sm
    if rs: b["responsiveStyles"] = rs
    if children: b["children"] = children
    if component: b["component"] = component
    return b

def Text(text, tag="p", lg=None, md=None, sm=None):
    return E(tag=tag, lg=lg, md=md, sm=sm, component={"name":"Text","options":{"text":text}})

def Img(src, alt="", lg=None):
    base = {"width":"100%","height":"100%","position":"relative"}
    if lg: base.update(lg)
    return E(lg=base, component={"name":"Image","options":{
        "image":src, "altText":alt, "backgroundSize":"cover",
        "backgroundPosition":"center", "lazy":True
    }})

def Video(src, poster=None, lg=None):
    base = {"position":"absolute","top":"0","left":"0","width":"100%","height":"100%"}
    if lg: base.update(lg)
    return E(lg=base, component={"name":"Video","options":{
        "video":src, "posterImage":poster,
        "autoPlay":True, "muted":True, "loop":True,
        "playsInline":True, "controls":False,
        "fit":"cover", "position":"center", "lazy":False
    }})

SERIF_FONT = "'Cormorant Garamond', 'Times New Roman', serif"
INK = "#1A1A1A"
MUTED = "#6B6B6B"
SOFT = "#F5F1EA"
ACCENT = "#C8551F"

# ─── 1. HERO ────────────────────────────────────────────────────────────
def hero():
    return E(tag="section",
        lg={"position":"relative","height":"100vh","minHeight":"600px","overflow":"hidden","marginTop":"-80px","backgroundColor":"black"},
        md={"marginTop":"-128px"},
        children=[
            Video(VIDEO_URL, POSTER_URL),
            E(lg={"position":"absolute","inset":"0","background":"linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.55) 100%)","zIndex":"2"}),
            E(lg={"position":"absolute","inset":"0","zIndex":"3","height":"100%","display":"flex","flexDirection":"column",
                "alignItems":"center","justifyContent":"flex-end","textAlign":"center",
                "padding":"0 24px 96px 24px","color":"white"},
                sm={"padding":"0 16px 64px 16px"},
                children=[
                    Text("Tu refugio en la ciudad", tag="h1",
                        lg={"fontFamily":SERIF_FONT,"fontSize":"80px","fontWeight":"300","lineHeight":"1.05","maxWidth":"900px","color":"white","margin":"0","letterSpacing":"-0.01em"},
                        md={"fontSize":"60px"}, sm={"fontSize":"42px"}),
                    Text("Arriendo de casas amobladas inmersas en la naturaleza con vistas a la cordillera y al valle de la Dehesa.",
                        lg={"marginTop":"28px","fontSize":"18px","maxWidth":"560px","opacity":"0.95","lineHeight":"1.6","color":"white","fontWeight":"300"},
                        sm={"fontSize":"15px","marginTop":"20px"})
                ])
        ])

# ─── 2. NARRATIVA ───────────────────────────────────────────────────────
def narrativa():
    return E(tag="section",
        lg={"maxWidth":"960px","margin":"0 auto","padding":"112px 24px 96px","textAlign":"center"},
        sm={"padding":"72px 16px 56px"},
        children=[
            Text("Pueblo nace de la idea de volver a lo esencial.", tag="h2",
                lg={"fontFamily":SERIF_FONT,"fontSize":"56px","fontWeight":"300","lineHeight":"1.15","margin":"0 0 32px","color":INK,"letterSpacing":"-0.01em"},
                md={"fontSize":"44px"}, sm={"fontSize":"30px","marginBottom":"24px"}),
            Text("Un lugar pensado para caminar entre parques y pasarelas, mirar la cordillera, encontrarse con otros y dejar que la naturaleza marque el ritmo del día. Aquí, cada experiencia se siente simple y auténtica.",
                lg={"fontSize":"19px","lineHeight":"1.75","color":MUTED,"maxWidth":"760px","margin":"0 auto","fontWeight":"300"},
                sm={"fontSize":"16px"})
        ])

# ─── 3. PILARES (5 columnas) ────────────────────────────────────────────
def pilares():
    PILARES = [
        ("La cordillera no es un paisaje: es nuestra inspiración", "Inmersión en la naturaleza",
            f"{CDN}/07A0373_1_9306cd35-d2d4-4c49-b3de-55aa005f487c.webp"),
        ("Cerca de todo, envuelta en silencio", "Locación",
            f"{CDN}/amplios_horizontes_1_bc15627e-8089-4171-acab-715a5364f634.webp"),
        ("Tu bienestar es nuestra prioridad", "Seguridad y confianza",
            f"{CDN}/seguridad_y_confianza_07A9597_1_bb4787db-6cd4-46f1-a31f-d924fa2a12d8.webp"),
        ("Libertad para vivir a tu ritmo", "Arriendo flexible y sin ataduras",
            f"{CDN}/Arriendo_flexible_y_sin_ataduras_07A0374_1_1_9e1c59b4-d381-446d-aa82-afe0d283b9c7.webp"),
        ("Creemos en el valor de compartir", "Vida en comunidad",
            f"{CDN}/vida_en_comunidad_07A0078_1_7bdc8b09-9b68-4924-a72c-3bea87f72e31.webp"),
    ]
    cards = [
        E(lg={"display":"flex","flexDirection":"column"},
            children=[
                E(lg={"aspectRatio":"3/4","overflow":"hidden","backgroundColor":SOFT,"marginBottom":"20px"},
                    children=[Img(img, title)]),
                Text(title, tag="h3",
                    lg={"fontFamily":SERIF_FONT,"fontSize":"22px","fontWeight":"300","lineHeight":"1.25","color":INK,"margin":"0 0 8px","minHeight":"60px"},
                    sm={"fontSize":"18px","minHeight":"unset"}),
                Text(subtitle,
                    lg={"fontSize":"12px","letterSpacing":"2.5px","color":MUTED,"textTransform":"uppercase","margin":"0","fontWeight":"500"})
            ])
        for title, subtitle, img in PILARES
    ]
    return E(tag="section",
        lg={"padding":"56px 24px 96px"},
        sm={"padding":"40px 16px 64px"},
        children=[
            E(lg={"maxWidth":"1440px","margin":"0 auto","display":"grid","gridTemplateColumns":"repeat(5, 1fr)","gap":"28px 12px"},
                md={"gridTemplateColumns":"repeat(3, 1fr)","gap":"28px 16px"},
                sm={"gridTemplateColumns":"repeat(2, 1fr)","gap":"24px 16px"},
                children=cards)
        ])

# ─── 4. IMAGEN + TEXTO ──────────────────────────────────────────────────
def imagen_texto():
    return E(tag="section",
        lg={"maxWidth":"1280px","margin":"0 auto","padding":"96px 24px","display":"grid","gridTemplateColumns":"1fr 1fr","gap":"64px","alignItems":"center"},
        md={"gridTemplateColumns":"1fr","gap":"40px"},
        sm={"padding":"64px 16px","gap":"32px"},
        children=[
            E(lg={"aspectRatio":"4/3","overflow":"hidden","backgroundColor":SOFT},
                children=[Img(f"{CDN}/07A1871_870b59a3-cea5-46af-a04f-16711cf0bdd6_1.webp", "Vista panorámica del valle")]),
            E(children=[
                Text("Un lugar para quedarte el tiempo que necesites", tag="h2",
                    lg={"fontFamily":SERIF_FONT,"fontSize":"48px","fontWeight":"300","lineHeight":"1.15","margin":"0 0 28px","color":INK},
                    sm={"fontSize":"32px","marginBottom":"20px"}),
                Text("Arriendo de casas amobladas integradas al paisaje, con luz natural y vistas a la cordillera.",
                    lg={"fontSize":"16px","lineHeight":"1.75","color":MUTED,"margin":"0 0 18px","fontWeight":"300"}),
                Text("Como en todo pueblo, hay un punto de encuentro: La Casita, un espacio para un café, algo rico para comer, para trabajar con calma o simplemente cruzarse con otros de manera natural.",
                    lg={"fontSize":"16px","lineHeight":"1.75","color":MUTED,"margin":"0 0 18px","fontWeight":"300"}),
                Text("Con un equipo atento, arriendo flexible y una ubicación privilegiada —cerca de todo, envuelta en silencio— Pueblo propone una forma de vivir simple, conectada y tranquila desde el primer día.",
                    lg={"fontSize":"16px","lineHeight":"1.75","color":MUTED,"margin":"0","fontWeight":"300"})
            ])
        ])

# ─── 5. CASAS (intro + grid 4) ──────────────────────────────────────────
def casas():
    CASAS = [
        ("casa-doble-altura","Casa Doble Altura","2 HABITACIONES / 2,5 BAÑOS",
         "Dos niveles y doble altura, pensada para vivir con mayor amplitud y privacidad entre ambientes.",
         f"{CDN}/07A1871_870b59a3-cea5-46af-a04f-16711cf0bdd6_1.webp"),
        ("casa-parque","Casa Parque","2 HABITACIONES / 2 BAÑOS",
         "Un primer piso que se abre al parque, con la terraza como extensión natural de la casa.",
         f"{CDN}/07A9319_9e57ed7b-b137-4536-ae8e-abfc85a8aeec_1.webp"),
        ("casa-panoramica","Casa Panorámica","2 HABITACIONES / 2 BAÑOS",
         "Un segundo piso con vistas abiertas a la cordillera y mayor sensación de perspectiva.",
         f"{CDN}/07A0248.jpg"),
        ("casa-suite","Casa Suite","1 HABITACIÓN / 1,5 BAÑOS",
         "Un dormitorio, con la mayor amplitud interior y una experiencia más abierta y protagónica.",
         f"{CDN}/IMG_0011_1.webp"),
    ]
    cards = [
        E(link=f"/casas/{slug}",
            lg={"display":"block","textDecoration":"none","color":"inherit"},
            children=[
                E(lg={"aspectRatio":"2/3","overflow":"hidden","backgroundColor":SOFT,"marginBottom":"22px"},
                    children=[Img(img, name)]),
                Text(name, tag="h3",
                    lg={"fontFamily":SERIF_FONT,"fontSize":"26px","fontWeight":"300","lineHeight":"1.2","color":INK,"margin":"0 0 8px"},
                    sm={"fontSize":"22px"}),
                Text(specs,
                    lg={"fontSize":"11px","letterSpacing":"2.5px","color":MUTED,"textTransform":"uppercase","margin":"0 0 14px","fontWeight":"500"}),
                Text(desc,
                    lg={"fontSize":"14px","lineHeight":"1.7","color":MUTED,"margin":"0 0 18px","fontWeight":"300"}),
                Text("ver más →",
                    lg={"fontSize":"13px","color":INK,"margin":"0","letterSpacing":"0.5px"})
            ])
        for slug, name, specs, desc, img in CASAS
    ]
    return E(tag="section",
        lg={"maxWidth":"1280px","margin":"0 auto","padding":"96px 24px"},
        sm={"padding":"64px 16px"},
        children=[
            E(lg={"textAlign":"center","marginBottom":"64px"},
                children=[
                    Text("Espacios para quedarse", tag="h2",
                        lg={"fontFamily":SERIF_FONT,"fontSize":"56px","fontWeight":"300","margin":"0 0 20px","color":INK},
                        sm={"fontSize":"38px"}),
                    Text("Cada casa propone una experiencia distinta, unida por la luz, el diseño y la calma del entorno.",
                        lg={"fontSize":"17px","color":MUTED,"maxWidth":"640px","margin":"0 auto","lineHeight":"1.65","fontWeight":"300"})
                ]),
            E(lg={"display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"32px"},
                md={"gridTemplateColumns":"repeat(2, 1fr)"},
                sm={"gridTemplateColumns":"1fr"},
                children=cards)
        ])

# ─── 6. CTA Estadías ────────────────────────────────────────────────────
def cta():
    return E(tag="section",
        lg={"backgroundColor":SOFT,"padding":"96px 24px","textAlign":"center"},
        sm={"padding":"64px 16px"},
        children=[
            E(lg={"maxWidth":"720px","margin":"0 auto"},
                children=[
                    Text("Estadías flexibles", tag="h2",
                        lg={"fontFamily":SERIF_FONT,"fontSize":"56px","fontWeight":"300","margin":"0 0 24px","color":INK},
                        sm={"fontSize":"38px"}),
                    Text("Reserva para nuestras estadías de corto, mediano y largo plazo.",
                        lg={"fontSize":"17px","color":MUTED,"margin":"0 0 40px","lineHeight":"1.6","fontWeight":"300"}),
                    E(lg={"display":"flex","gap":"16px","justifyContent":"center","flexWrap":"wrap"},
                        children=[
                            E(link="https://puebloladehesa.book2dream.com/",
                                lg={"display":"inline-block","padding":"15px 40px","backgroundColor":ACCENT,"color":"white","borderRadius":"999px","fontSize":"13px","textDecoration":"none","fontWeight":"500","letterSpacing":"1px"},
                                children=[Text("RESERVAR", lg={"color":"white","margin":"0"})]),
                            E(link="/contacto",
                                lg={"display":"inline-block","padding":"15px 40px","border":f"1px solid {INK}","color":INK,"borderRadius":"999px","fontSize":"13px","textDecoration":"none","letterSpacing":"1px"},
                                children=[Text("CONTÁCTANOS", lg={"color":INK,"margin":"0"})])
                        ])
                ])
        ])

# ─── 7. EXPERIENCIAS ────────────────────────────────────────────────────
def experiencias():
    EXPS = [
        ("Naturaleza", "Cabalgatas al atardecer", f"{CDN}/Cabalgata.png"),
        ("Naturaleza", "Trekking en cordillera", f"{CDN}/trekking_1.webp"),
        ("Pausa", "Jardín y silencio", f"{CDN}/Jardin_07A9818_1.webp"),
        ("Comunidad", "Vida compartida", f"{CDN}/vida_en_comunidad_07A0078_1_7bdc8b09-9b68-4924-a72c-3bea87f72e31.webp"),
    ]
    cards = [
        E(lg={"position":"relative","aspectRatio":"3/4","overflow":"hidden","backgroundColor":SOFT},
            children=[
                Img(img, title),
                E(lg={"position":"absolute","bottom":"0","left":"0","right":"0","padding":"20px",
                    "background":"linear-gradient(to top, rgba(0,0,0,0.85), transparent)"},
                    children=[
                        Text(tag_, lg={"fontSize":"10px","letterSpacing":"2.5px","color":"rgba(255,255,255,0.85)","textTransform":"uppercase","margin":"0 0 6px","fontWeight":"500"}),
                        Text(title, tag="p", lg={"fontFamily":SERIF_FONT,"fontSize":"20px","color":"white","fontWeight":"300","lineHeight":"1.25","margin":"0"})
                    ])
            ])
        for tag_, title, img in EXPS
    ]
    return E(tag="section",
        lg={"backgroundColor":SOFT,"padding":"96px 24px"},
        sm={"padding":"64px 16px"},
        children=[
            E(lg={"maxWidth":"1280px","margin":"0 auto"},
                children=[
                    E(lg={"marginBottom":"56px"},
                        children=[
                            Text("Experiencias que le dan vida a Pueblo", tag="h2",
                                lg={"fontFamily":SERIF_FONT,"fontSize":"56px","fontWeight":"300","lineHeight":"1.15","margin":"0 0 24px","maxWidth":"800px","color":INK},
                                sm={"fontSize":"34px"}),
                            Text("Además de disfrutar en Pueblo, organizamos experiencias en tres mundos —naturaleza, pausa y comunidad— que nacen en Pueblo y se expanden hacia su entorno: desde caminatas, clases de yoga, hasta exploraciones que conectan la cordillera, los centros de ski y la costa.",
                                lg={"fontSize":"17px","color":MUTED,"lineHeight":"1.7","maxWidth":"760px","fontWeight":"300"})
                        ]),
                    E(lg={"display":"grid","gridTemplateColumns":"repeat(4, 1fr)","gap":"16px"},
                        md={"gridTemplateColumns":"repeat(2, 1fr)"},
                        children=cards)
                ])
        ])

# ─── 8. QUOTE (slideshow con baner.webp) ────────────────────────────────
def quote():
    return E(tag="section",
        lg={"position":"relative","height":"70vh","minHeight":"500px","overflow":"hidden"},
        children=[
            Img(BANER_URL, "Pueblo La Dehesa", lg={"position":"absolute","inset":"0","width":"100%","height":"100%"}),
            E(lg={"position":"absolute","inset":"0","background":"linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2), transparent)"}),
            E(lg={"position":"relative","height":"100%","display":"flex","alignItems":"center","padding":"0 80px"},
                sm={"padding":"0 24px"},
                children=[
                    Text("La vida de pueblo que hoy buscamos, con naturaleza y calma, sin salir de la ciudad", tag="p",
                        lg={"fontFamily":SERIF_FONT,"fontSize":"56px","color":"white","fontWeight":"300","lineHeight":"1.2","maxWidth":"760px","margin":"0"},
                        md={"fontSize":"40px"}, sm={"fontSize":"26px"})
                ])
        ])

# ─── BUILD ──────────────────────────────────────────────────────────────
def main():
    blocks = [hero(), narrativa(), pilares(), casas(), cta(), experiencias(), quote()]
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
        f"https://builder.io/api/v1/write/{MODEL_NAME}/{CONTENT_ID}",
        data=body,
        headers={"Authorization": f"Bearer {PRIVATE_KEY}", "Content-Type": "application/json"},
        method="PUT"
    )
    try:
        with urllib.request.urlopen(req) as r:
            d = json.loads(r.read())
        if d.get("id"):
            print(f"✅ Home actualizado")
            print(f"   ID: {d['id']}")
            print(f"   Edit: https://builder.io/content/{d['id']}")
            print(f"   View: {PREVIEW_URL}")
        else:
            print(json.dumps(d, indent=2)[:600])
    except urllib.error.HTTPError as e:
        print(f"HTTP {e.code}: {e.read().decode()[:600]}")

if __name__ == "__main__":
    main()
