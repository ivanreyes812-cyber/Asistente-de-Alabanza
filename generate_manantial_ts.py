# -*- coding: utf-8 -*-
import json

def get_all_songs():
    songs = []
    def a(num, title, category, key, bpm, author, lyrics):
        songs.append({
            "id": f"manantial-{num}",
            "number": num,
            "title": title,
            "book": "manantial",
            "category": category,
            "originalKey": key,
            "bpm": bpm,
            "author": author,
            "lyrics": lyrics.strip()
        })

    # 1 to 10
    a(1, "Por Fe", "Doctrina", "C", 90, "Juan Carlos Pérez", """I
[C]Por fe yo sé que mi [G]Dios creó el universo,
[F]Las estrellas, la luna, la [G]tierra, y el sol tam[C]bién.
//[C]Hizo todos los animalitos,
Y en los [F]montes puso arbolitos,
Para [G]que de sus frutos pudiera yo siempre co[C]mer//

II
[C]Por fe Noé construyó un [G]arca muy grande
Para [F]que todos los que entraran se [G]pudieran sal[C]var
//Porque [C]llovería tan fuerte
Que las [F]aguas cubrirían los montes
Y los [G]hombres desobedientes se iban a aho[C]gar//

III
[C]Por fe yo sé que Jesús mu[G]rió por el hombre
Para [F]que bautizado en su nombre se [G]pudiera sal[C]var
//Porque [C]pronto vendrá el gran día
Que su [F]iglesia será recogida
Y los [G]hombres desobedientes al fuego se i[C]rán//""")

    a(2, "Quiero Adorarte", "Adoración", "D", 72, "Juan Carlos Pérez", """[D]Digno de Honra, [A]digno de Gloria [Bm]y de adoración
[G]Rey de los siglos, [D]Dios Poderoso, [Em]Santo Tú eres Je[A7]sús
[D]Con toda mi [A]alma quiero a[Bm]dorarte
Y exal[G]tarte Se[A]ñor
[G]Rindo mi vida, [A]mi vida en[D]tera,
[G]Toma mi [A7]cora[D]zón.""")

    a(3, "Sin Tu Amor", "Adoración", "Em", 68, "Guillermo Cabezas / Orlando Roa", """I
[Em]Como gota de agua [Am]en un cristal,
[D7]Como fuego que se apaga [G]lentamente,
[C]Como una canción sin inspi[Am]ración,
Como un [B7]pajarillo herido que se [Em]muere;
Si tu [Am]mano no me guía yo no [D7]tengo dirección,
Si tu a[B7]liento me faltara mori[Em]ría mi corazón.

CORO
[G]No, yo no sé, qué se[D]ría de mi vida
Sin tu a[C]mor, no lo [B7]sé;
Cami[Em]nando cabizbajo sin sa[Am]ber a donde voy,
Sopor[B7]tando el peso de mi propio [Em]mal.

II
[Em]Enjaulado en el silencio [Am]y en la pena,
Sin[D7]tiendo que la angustia me en[G]cadena,
No ten[C]dría razón de ser, ale[Am]jado de la fe,
Igno[B7]rando tu camino Jesuc[Em]risto;
Desdi[Am]chado eternamente sin sen[D7]tir tu salvación,
Con un [B7]traje de miseria, prisio[Em]nero del error.

III
[Em]Huyendo de tu pre[Am]sencia,
Esca[D7]pando hacia el pla[G]cer,
Sin tener [C]sosiego ni hallar re[Am]poso,
Dime a [B7]dónde podría ir, Oh Dios, [Em]a quién acudir;
Sólo [Am]Tú tienes palabras de [D7]vida eterna,
Sólo en [B7]Ti está la vida y la luz [Em]de la verdad,
Y tu Pa[B7]labra me guía y me da feli[Em]cidad.""")

    a(4, "Hay Poder en el Nombre", "Alabanza", "G", 110, "Juan Carlos Pérez", """I
En el [G]Santo Nombre de Jesús 
Hay todo [C]poder para li[G]brar 
De las ataduras del error 
Y de las ca[D7]denas de mal[G]dad.

II
Invo[G]cando el nombre de Jesús 
Todas las ti[C]nieblas hui[G]rán 
Y podremos ver brillar la luz, 
Sabremos por [D7]donde cami[G]nar.

CORO
//Hay po[G]der en el nombre de Jesús//
En Su [C]Nombre hay vic[G]toria:
En el [D7]nombre de Je[G]sús.""")

    a(5, "Quiero Llegar", "Adoración", "C", 75, "Edgar Devia", """I
[C]Acude, Señor, [G]junto a mí,
[F]No sea confun[C]dido jamás;
[F]Los malos quieren que mi [C]vida por siempre 
Sea hun[Dm]dida en el fango del [G7]mal.
Pero [C]sé que Tú me gui[G]arás
Por [F]sendas de bien y de [C]paz;
To[F]mando mi mano lleva[C]rás mi alma 
Hasta [G7]mi objetivo alcan[C]zar.

CORO
[C]Yo soy de ti: No me [F]dejes caer en el [C]mal.
Si solo estoy, no me [F]siento capaz de lu[G7]char;
Ayú[F]dame, quiero lle[C]gar
A la man[G7]sión de gozo y [C]paz.

II
[C]A veces siento desma[G]yar
A [F]causa de tanta mal[C]dad;
Las [F]pruebas llegan a mi [C]vida 
Y siento ense[Dm]guida la fuerza del [G7]mal.
Pero en [C]ese instante tu a[G]mor 
Me [F]da fortaleza y va[C]lor
Y [F]siento en mi alma corri[C]entes de vida
De [G7]gracia y de eterno so[C]laz.""")

    a(6, "Nuevo Amanecer", "Alabanza", "D", 100, "Guillermo Cabezas / Orlando Roa", """I
[D]Hay un canto de alabanza en el [G]trino de las aves,
En el [A7]sol de la mañana que a la [D]luz sus puertas abre
Hay aroma de poema [G]cuando se despierta el día,
Se di[A7]sipan las tinieblas, resplandece la ale[D]gría.

CORO
[D7]Habrá un ma[G]ñana me[A7]jor,
Esta[D]remos junto a [Bm]Dios;
Ven[Em]drá un mañana sin [A7]fin,
Donde [G]siempre has [A7]de re[D]ír.

II
En a[D]quel murmullo suave de las [G]aguas presurosas,
En e[A7]sa sonrisa amable que hace [D]fáciles las cosas,
En el brillo de unos ojos [G]con deseos de vivir,
En la [A7]paz que hay en el rostro de aquel que vive fe[D]liz.

III
La tris[D]teza y el lamento pasa[G]rán en un momento, 
[A7]Dios limpiará con su mano el [D]llanto que has derramado,
En el brillo de unos ojos [G]con deseos de vivir,
En la [A7]paz que hay en el rostro de aquel que vive fe[D]liz.""")

    a(7, "Tu Nombre", "Adoración", "G", 72, "Jhon Carlos Mena / Orlando Roa", """I
Tu [G]Nombre es como un[Bm]güento 
Derra[C]mado en mi ser que da [D7]vida en mí; 
Es un [G]río de agua [Bm]viva
Que [C]fluye muy dentro sa[D7]ciando mi sed;
[C]Nombre que ha cam[D7]biado mi [G]vida,
[C]Dando grato o[D7]lor para [G]Dios, 
[C]Hoy en sacri[D7]ficio vivo e[C]levo [D7]mi [G]voz.

CORO
Vengo a ren[C]dirme a tus [D7]pies Se[G]ñor,
Ofre[C]ciendo mi [D7]cora[G]zón,
Quiero en[C]tregarte más [D7]que una can[Bm]ción, [Em]
Mi [C]vida y todo lo que [D7]soy,
Razón de vi[C]vir me has [D7]dado por tu [C]nombre Je[G]sús.

II
Tu [G]Nombre es como [Bm]roca, 
Que af[C]irma mis pies en la [D7]cruel tempestad; 
Eres [G]mi refugio se[Bm]guro,
Y en [C]tiempo de guerra Tú [D7]eres mi paz;
[C]Nombre que me ha [D7]dado la [G]vida, 
[C]Seguro y con[D7]fiado es[G]taré;
[C]Nombre sobre [D7]todo nombre, es [C]Tu Nom[D7]bre Je[G]sús.""")

    a(8, "Mensaje de Amor", "Evangelismo", "G", 88, "Edgar Devia", """I
Si en tu [G]vida no hay paz,
Si man[Em]tienes sufriendo y llorando,
Y has pen[C]sado tal vez
Que se[D7]ría mejor si murieras;
Te ha fa[G]llado quizás
La per[Em]sona que tú más querías 
Y por [C]esa razón 
Ya no [D7]quieres saber de la vida. 

CORO
Oye el [G]mensaje de amor que te [Em]vengo a decir:
Jesu[C]cristo amoroso [D7]quiere cambiar tu vida;
Aunque no [G]quieras creerlo [Em]Él te ama y te quiere ayudar; 
Si le en[C]tregas tu vida [D7]Él contigo es[G]tará. 

II
Cuando [G]solo estás 
Y en si[Em]lencio has buscado respuesta
¿Por qué e[C]xiste el amor
Y tam[D7]bién la traición en la tierra?
Tam[G]bién Cristo Jesús 
Reci[Em]bió en vez de amor las traiciones
Cuando [C]sólo trató 
De ofre[D7]cernos amor y favores.""")

    a(9, "Gracias por Todo Jesús", "Agradecimiento", "D", 80, "Luz E. Cifuentes", """I
Estoy [D]cierto que Jesús me [Bm]ama
Y que [G]en la angustia a mi lado se [A7]halla,
Por [D]eso prodigo mi ala[Bm]banza,
Por[G]que el sufrimiento es mi espe[A7]ranza.
Doy [D]gracias a Dios por la adver[Bm]sidad,
Cuando [G]el enemigo me a[A7]taca;
Por[D]que fuerte soy en debili[Bm]dad,
Sé [G]que me bastará su [A7]gracia,
Con [G]tal de salvar mi [A7]alma, es ca[D]paz
Mol[Bm]dearme con mar[G]tillo y [A7]llama,
Y el [D]diablo podrá mi cuerpo a[Bm]cabar,
Más [G]no podrá ma[A7]tar mi [D]alma.

II
Ten por [D]cierto que Jesús te [Bm]ama,
Y que [G]Él permite lo que te [A7]pasa,
Te ase[D]guro hermano, y her[Bm]mana,
Que [G]Él contigo hará lo que le [A7]plazca.
Hubo [D]una mujer que a Jesús cla[Bm]mó,
Le di[G]era tan sólo mi[A7]gajas,
Y la [D]bendición que dio el reden[Bm]tor,
Fue [G]grande que sanó su [A7]casa;
Da [G]gracias a Dios en la [A7]adversi[D]dad
Cuan[Bm]do sientas que [G]todo a[A7]caba,
Y a[D]sí aprenderás que es sólo en Je[Bm]sús,
Que [G]debes po[A7]ner tu con[D]fianza.""")

    a(10, "Caña Cascada", "Consolación", "Em", 72, "Luz E. Cifuentes", """I
Tengo una peti[Em]ción para tí, Je[Am]sús;
Quiere mi cora[B7]zón reposar en [Em]tí:
Déjame en tu re[E7]gazo recos[Am]tarme,
Porque tribu[Em]lación ha llegado a [B7]mí,
Mis ojos están gas[Em]tados de tanto su[Am]frir,
Los que estaban a mi [B7]lado ya se han i[Em]do.

CORO
Si mi [Em]vida es caña cascada,
No per[Am]mitas que se quiebre;
Si es [D7]pábilo humeante,
Que no [G]se apague;
Por[C]que como el firma[Am]mento,
Aún más [B7]grande es tu misericordia,
Per[Am]míteme que de tu [Em]mano,
Fuerte [B7]me afe[Em]rre.

II
Oh, señor Je[Em]sús, no tengo a dónde [Am]ir;
Sólo Tú tienes pa[B7]labras que me hacen vi[Em]vir;
Cual tamo que lleva el [E7]viento me han dese[Am]chado.
En grande oscuri[Em]dad estoy, no puedo esca[B7]par,
Sólo tu santa [Em]diestra me dará liber[Am]tad,
Sólo en Ti, éste, mi o[B7]caso, amanece[Em]rá.""")

    return songs

print("Base loaded")
