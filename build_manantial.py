# -*- coding: utf-8 -*-
import json

songs_data = [
  # 1
  {
    "id": "manantial-1",
    "number": 1,
    "title": "Por Fe",
    "book": "manantial",
    "category": "Doctrina",
    "originalKey": "C",
    "bpm": 90,
    "author": "Juan Carlos Pérez",
    "lyrics": """I
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
Y los [G]hombres desobedientes al fuego se i[C]rán//"""
  },
  # 2
  {
    "id": "manantial-2",
    "number": 2,
    "title": "Quiero Adorarte",
    "book": "manantial",
    "category": "Adoración",
    "originalKey": "D",
    "bpm": 72,
    "author": "Juan Carlos Pérez",
    "lyrics": """[D]Digno de Honra, [A]digno de Gloria [Bm]y de adoración
[G]Rey de los siglos, [D]Dios Poderoso, [Em]Santo Tú eres Je[A7]sús
[D]Con toda mi [A]alma quiero a[Bm]dorarte
Y exal[G]tarte Se[A]ñor
[G]Rindo mi vida, [A]mi vida en[D]tera,
[G]Toma mi [A7]cora[D]zón."""
  },
  # 3
  {
    "id": "manantial-3",
    "number": 3,
    "title": "Sin Tu Amor",
    "book": "manantial",
    "category": "Adoración",
    "originalKey": "Em",
    "bpm": 68,
    "author": "Guillermo Cabezas / Orlando Roa",
    "lyrics": """I
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
Y tu Pa[B7]labra me guía y me da feli[Em]cidad."""
  },
  # 4
  {
    "id": "manantial-4",
    "number": 4,
    "title": "Hay Poder en el Nombre",
    "book": "manantial",
    "category": "Alabanza",
    "originalKey": "G",
    "bpm": 110,
    "author": "Juan Carlos Pérez",
    "lyrics": """I
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
En el [D7]nombre de Je[G]sús."""
  },
  # 5
  {
    "id": "manantial-5",
    "number": 5,
    "title": "Quiero Llegar",
    "book": "manantial",
    "category": "Adoración",
    "originalKey": "C",
    "bpm": 75,
    "author": "Edgar Devia",
    "lyrics": """I
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
De [G7]gracia y de eterno so[C]laz."""
  }
]

print(f"Base songs: {len(songs_data)}")
