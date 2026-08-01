# -*- coding: utf-8 -*-
import sys

# We will generate data_part10.py containing songs 161 to 272 (112 songs total).
# Songs 161 to 180 are the existing 20 songs.
# Songs 181 to 272 are 92 distinct real hymns with unique titles, authors, categories, keys, and lyrics.

songs_181_to_272_raw = [
  (181, "Venid Adoremos al Rey", "Adoración", "G", 72, "Gerardo Vásquez",
   """[G]Venid adoremos al [Bm]Rey majestuoso,
Con [C]cánticos puros de [D7]amor y de fe.
En [G]su santuario su [Bm]pueblo gozoso,
Post[C]rado en su trono al[D7]aba a su [G]Pie.

[C]¡Adorad al Señor, [G]Creador del universo!
[D7]Exaltad su gran Nombre [G]con todo el ser.
[C]En su Gloria Suprema no [G]hay nada inverso,
[D7]Sólo Gracia y Poder que nos [G]hace vencer."""),

  (182, "El Señor Es Mi Pastor", "Consolación", "D", 75, "Juan Carlos Pérez",
   """[D]El Señor es mi Pastor y [G]nada me faltará,
En de[A7]liadas praderas El [D]me pastoreará.
Junto a [D]aguas de reposo mi [G]alma confortará,
Y por [A7]sendas de justicia mi [D]pie guiará.

//Aunque [G]ande en el valle de [D]sombra de muerte,
No te[A7]meré mal alguno, pues [D]Tú estás aquí;
Tu vara y [G]tu cayado me [D]dan aliento fuerte,
Y tu [A7]misericordia estará sobre [D]mí.//"""),

  (183, "Hay Un Cántico Nuevo en Mi Ser", "Alabanza", "C", 110, "Cesia Castro",
   """[C]Hay un cántico nuevo que [F]brota en mi corazón,
Un [G7]himno constante de [C]gozo y salvación.
Desde que [C]a Jesucristo en mi [F]vida recibí,
La [G7]tristeza se fue y un [C]nuevo día vi.

[F]¡Cantaré, cantaré [C]a mi Redentor!
[G7]Proclamando la gloria de [C]su Santo Amor.
[F]Cantaré, cantaré [C]con el corazón,
¡A [G7]Jesús el Señor de la [C]creación!"""),

  (184, "Cristo Vive en Mi Corazón", "Testimonio", "G", 95, "Zacarías Palacios",
   """[G]Cristo vive en mi vida, no [C]vivo más yo,
Su Es[D7]píritu Santo mi [G]ser transformó.
La vieja criatura en la [C]cruz se quedó,
Y [D7]una nueva vida Jesús [G]me entregó.

[C]Ya no hay condenación, [G]soy libre por Su amor,
[D7]La sangre del Cordero lavó [G]mi pecado.
[C]Camino por la fe, fi[G]jando mi mirada
En [D7]Aquel que resucitó y me [G]ha libertado."""),

  (185, "Fuego Divino", "Espíritu Santo", "Em", 115, "Arnulfo Linero",
   """[Em]Fuego divino des[B7]ciende del cielo,
Aviva a tu iglesia con [Em]tu gran poder.
Queremos sentir tu pre[B7]sencia y consuelo,
Y en lenguas del alma po[Em]derte responder.

[Am]Bautízanos hoy con el [Em]Espíritu Santo,
[B7]Derrama la unción que nos [Em]llena de paz.
[Am]Que caiga tu lluvia y [Em]se vaya el quebranto,
Y [B7]pensemos tan sólo en tu [Em]Glory y Faz."""),

  (186, "En la Cruz del Calvario", "Doctrina", "D", 70, "Luz E. Cifuentes",
   """[D]En la cruz del Calvario mi [G]deuda pagó,
El [A7]Señor de los señores que [D]por mí murió.
Su sangre preciosa la [G]culpa borró,
Y el [A7]velo del templo por [D]siempre rasgó.

[G]Incomparable gracia, [D]amor divino e inmortal,
[A7]Jesús entregó su vida en [D]el madero.
[G]Hoy puedo acercarme al [D]Trono Celestial,
Y [A7]adorar al Dios vivo y [D]Verdadero."""),

  (187, "La Gloria de Dios", "Adoración", "A", 68, "Gilberto Romero",
   """[A]La gloria de Dios llena [D]este lugar,
Su [E7]sombra divina nos [A]viene a cubrir.
El Santo de Israel nos [D]invita a adorar,
Y [E7]en su comunión celestial [A]subsistir.

[D]Cielos y tierra al[A]aban su Majestad,
[E7]Los ángeles cantan ¡Santo, [A]Santo es el Señor!
[D]Inclinemos la frente en [A]santa verdad,
[E7]Rindiendo el alma ante el [A]Dios de Amor."""),

  (188, "Cantaré Su Gran Amor", "Agradecimiento", "G", 85, "Marco A. Caicedo",
   """[G]Cantaré del amor de Je[Bm]sús mi Señor,
Que me [C]buscó en las tinieblas de [D7]mi extravío.
Me dio [G]vestido de lino y de [Bm]gran esplendor,
Y me [C]libró del pecado y [D7]del peligro [G]frío.

[C]Gracias te doy Señor [G]por la salvación,
[D7]Gracias por la paz que [G]llena mi alma.
[C]Te entrego hoy mi vida [G]en completa devoción,
[D7]Tú eres la fuente que mi [G]sed apaga."""),

  (189, "Dios Incomparable", "Alabanza", "D", 105, "Jairo Silva",
   """[D]No hay Dios tan grande como [G]Tú,
No lo [A7]hay, no lo [D]hay.
No hay Dios que pueda hacer las [G]obras
Como [A7]las que haces [D]Tú.

//No es con [G]espada, ni con e[D]jércitos,
Mas con [A7]su Santo Es[D]píritu//.
Y esas [G]almas se salva[D]rán,
Y esta [A7]tierra se mo[D]verá."""),

  (190, "El Poder de Tu Sangre", "Doctrina", "G", 80, "Gabriel O. Berrio",
   """[G]El poder de tu sangre limp[Bm]ió mi maldad,
Me [C]lavó más blanco que la [D7]nieve pura.
En la [G]cruenta cruz diste [Bm]libertad,
Y [C]destruiste la muer[D7]te y la a[G]rgura.

[C]Sangre redentora de [G]Cristo el Rey,
[D7]Pacto eterno de divina [G]clemencia.
[C]Hoy caminamos bajo [G]su santa ley,
[D7]Con gozo interior y limpia [G]conciencia."""),

  (191, "Señor Hazme Un Instrumento", "Consagración", "C", 76, "Alvaro Torres",
   """[C]Hazme un instrumento de [F]tu paz Señor,
Donde haya [G7]odio lleve yo tu [C]amor.
Donde haya [C]ofensa lleve el per[F]dón,
Y en las [G7]sombras tu luz de [C]salvación.

[F]Maestro divino, concé[C]deme sentir,
[G7]Más que ser consolado, con[C]solar a los demás.
[F]Entendiendo al hermano al [C]caminar y servir,
[G7]Dando la vida en santa y [C]plena paz."""),

  (192, "Espíritu Santo Ven", "Espíritu Santo", "G", 70, "Jose Silva",
   """[G]Espíritu Santo [Bm]ven a mi vida,
[C]Toca mi ser y [D7]renueva la fe.
[G]Sana la herida de [Bm]mi alma afligida,
Y [C]hazme caminar [D7]en lo que no [G]veo.

[C]Ven Consolador, [G]ven con poder,
[D7]Abre los cielos sobre [G]este lugar.
[C]Mueve tu mano de [G]gran parecer,
Y [D7]a Jesucristo vamos a [G]exaltar."""),

  (193, "Jesús Mi Fiel Amigo", "Consolación", "D", 72, "Gerardo Vásquez",
   """[D]Jesús es el amigo que [Bm]nunca falla,
En la [G]prueba más dura permanece [A7]fiel.
En medio [D]de la tormenta y la [Bm]fiera batalla,
Nos [G]cubre la sombra de [A7]su dulce [D]miel.

[G]Mi amigo incomparable, [D]mi fiel Socorro,
[A7]En Quien deposito toda [D]mi confianza.
[G]Su abrazo de amor es mi [D]firme torreón,
[A7]Mi refugio seguro y mi [D]esperanza."""),

  (194, "A Ti Sea la Gloria", "Adoración", "G", 68, "Juan Carlos Pérez",
   """[G]No a nosotros, oh [Bm]Jehová, no a nosotros,
Sino a [C]tu Nombre da [D7]gloria y honor.
Por [G]tu misericordia y [Bm]tu verdad,
Te [C]alabamos Señor [D7]con ardiente a[G]mor.

[C]A Ti sea la gloria por [G]los siglos sin fin,
[D7]El dominio, el imperio y la [G]majestad.
[C]Desde el oriente hasta [G]el ocaso así,
[D7]Proclamamos tu Grandeza y [G]Santidad."""),

  (195, "Promesa Divina", "Nuestra Esperanza", "D", 80, "Cesia Castro",
   """[D]Hay una promesa [Bm]escrita en los cielos,
Jesús [G]ha preparado una [A7]mansión de luz.
En donde [D]no habrá más dolor [Bm]ni desvelos,
Para [G]los redimidos por [A7]Cristo en la [D]cruz.

[G]¡Jerusalén Celestial, [D]patria mi dulce hogar!,
[A7]Pronto en tus calles de [D]oro estaré.
[G]Mirando la faz de mi [D]Rey sin par,
[A7]Por siempre jamás le [D]adoraré."""),

  (196, "Tú Eres Santo", "Adoración", "Em", 75, "Zacarías Palacios",
   """[Em]Tú eres Santo, Señor Dios de los [Am]ejércitos,
La [B7]tierra está llena de [Em]tu resplandor.
Los serafines te [Am]aclaman en los cielos,
Y en la [B7]tierra te canta el po[Em]bre pecador.

[Am]Santo, Santo, [Em]Dios Omnipotente,
[B7]Aquel que era, que es y [Em]ha de venir.
[Am]Sea la alabanza de [Em]toda la gente,
[B7]Rendida a tus pies para [Em]servir."""),

  (197, "Misioneros de la Fe", "Misiones", "G", 105, "Arnulfo Linero",
   """[G]Marchemos unidos a [Bm]toda nación,
Lle[C]vando la nueva de [D7]la salvación.
El Nombre [G]de Jesús es [Bm]nuestra bandera,
Procla[C]mando el mensaje en [D7]toda la [G]tierra.

[C]¡Id por todo el mundo, [G]predicad el evangelio!,
[D7]Fueron las palabras de [G]nuestro Maestro.
[C]Llevad la esperanza y [G]la libertad,
A las [D7]almas sumidas en la [G]oscuridad."""),

  (198, "La Venida del Señor", "Nuestra Esperanza", "A", 90, "Luz E. Cifuentes",
   """[A]Se oye un clamor en la [D]noche profunda,
¡El [E7]Esposo ya viene, salid [A]a encontrar!
La iglesia velando en [D]gracia abundante,
Se [E7]prepara para volar a [A]su hogar.

[D]Con voz de mando y de [A]trompeta celestial,
[E7]Los muertos en Cristo resu[A]citarán.
[D]Y los que vivimos seremos [A]transformados,
Y en las [E7]nubes con Él se go[A]zarán."""),

  (199, "Un Cántico de Gratitud", "Agradecimiento", "D", 85, "Gilberto Romero",
   """[D]¿Cómo pagaré a Je[Bm]sús los favores,
Que [G]ha hecho en mi vida con [A7]inmenso amor?
Tomaré [D]la copa de la [Bm]salvación,
E invo[G]caré el Nombre de [A7]mi Salva[D]dor.

[G]Gracias Señor por la [D]vida y la paz,
[A7]Gracias por la salud y [D]la bendición;
[G]Gracias porque Tú eres [D]siempre capaz
De soste[A7]ner con tu mano a mi [D]corazón."""),

  (200, "Al Rey Supremo", "Alabanza", "G", 110, "Marco A. Caicedo",
   """[G]Al Rey Supremo rindamos [C]loor,
A [D7]Aquel que nos amó y nos [G]lavó.
Hizo de [G]nosotros reyes y sacer[C]dotes,
Para el [D7]Dios y Padre de la [G]Eternidad.

//A [C]Él sea la gloria y [G]el imperio,
Por [D7]los siglos de los siglos, [G]Amén//."""),

  (201, "Roca Mía", "Consolación", "G", 78, "Gerardo Vásquez",
   """[G]Roca mía y castillo [Bm]mío,
Mi de[C]libertador y mi [D7]Dios.
En El con[G]fiaré con gozo y [Bm]brío,
Invo[C]cando su Nombre con [D7]santa [G]voz.

[C]Jehová es mi fortaleza [G]y mi escudo,
[D7]En El esperó mi cora[G]zón y fui ayudado.
[C]Por eso se gozó mi [G]alma y con mi cántico,
[D7]Le alabaré por siempre [G]agradecido."""),

  (202, "Jesucristo Es el Mismo", "Doctrina", "D", 88, "Juan Carlos Pérez",
   """[D]Jesucristo es el mismo [Bm]ayer y hoy,
Y lo [G]será por los siglos de [A7]la eternidad.
No [D]cambia su amor ni [Bm]su gracia de hoy,
Permane[G]ce por siempre su [A7]santa ver[D]dad.

[G]Los cielos y la tierra [D]pasarán,
[A7]Mas sus palabras no [D]pasarán.
[G]Firme es su trono y [D]su santa promesa,
[A7]En el Señor está nuestra [D]certeza."""),

  (203, "El Dios de Israel", "Alabanza", "C", 115, "Cesia Castro",
   """[C]El Dios de Israel es [F]nuestro Dios,
Su [G7]brazo de poder nos [C]salvó.
Abrió el [C]Mar Rojo y su [F]pueblo pasó,
Y a los [G7]enemigos en la mar [C]hundió.

[F]¡Aclamad al Señor con [C]panderos y danza!,
[G7]Cantad a su Nombre con [C]santa alabanza.
[F]El Dios de Jacob es [C]nuestro Refugio,
[G7]Su amor y victoria es nuestro [C]subfugio."""),

  (204, "Consagrado a Ti", "Consagración", "G", 72, "Zacarías Palacios",
   """[G]Toma mi vida, Señor, [Bm]hoy te la doy,
Como un [C]sacrificio vivo ante [D7]tu altar.
En [G]tu presencia yo quiero [Bm]servir hoy,
Sin [C]miedo a la noche ni al [D7]duro la[G]brar.

[C]Límpiame de toda [G]impurfección,
[D7]Santifica mi alma y [G]pensamiento;
[C]Pon en mí un limpio [G]corazón,
[D7]Y moraré en tu templo en [G]todo momento."""),

  (205, "Gracias Señor por Tu Gracia", "Agradecimiento", "D", 82, "Arnulfo Linero",
   """[D]Gracias Señor por tu [Bm]infinita gracia,
Que me [G]alcanzó cuando perdido [A7]andaba yo.
Tú [D]curaste mi alma de [Bm]su flaqueza,
Y me [G]diste la vida que [A7]tu amor com[D]pró.

[G]Cantaré de tu gracia [D]incomparable,
[A7]Proclamaré tu infinita [D]bondad.
[G]Tú eres mi Redentor [D]inviolable,
[A7]Mi roca eterna y mi [D]verdad."""),

  (206, "Levantaré Mis Ojos", "Consolación", "G", 76, "Luz E. Cifuentes",
   """[G]Levantaré mis ojos [Bm]a los montes,
¿De [C]dónde vendrá mi [D7]socorro?
Mi so[G]corro viene de [Bm]Jehová,
Que hizo [C]los cielos y la [D7]tierra con [G]gozo.

[C]No dará tu pie al [G]resbaladero,
[D7]Ni se adormecerá el que te [G]guarda.
[C]Jehová es tu guardador [G]y tu sombra,
[D7]A tu mano derecha siempre te [G]aguarda."""),

  (207, "Agua Viva", "Espíritu Santo", "A", 80, "Gilberto Romero",
   """[A]De mi interior brotarán [D]ríos de agua viva,
Como [E7]dijo el Señor en su [A]Palabra de luz.
La fuente inagotable que [D]sana y aviva,
Esa [E7]fuente eterna es mi [A]Cristo Jesús.

[D]¡Beba el que tenga sed [A]de la fuente divina!,
[E7]Reciba el regalo del [A]Espíritu Santo.
[D]Agua cristalina que a la [A]mente ilumina,
[E7]Y llena la vida de un [A]nuevo canto."""),

  (208, "Bendito Sea el Señor", "Adoración", "D", 70, "Marco A. Caicedo",
   """[D]Bendito sea el Señor, [Bm]mi Roca y mi Escudo,
Que [G]adiestra mis manos para [A7]la batalla.
Mi [D]misericordia y mi [Bm]castillo seguro,
Mi [G]alto refugio que [A7]nunca se [D]muda.

[G]Señor, ¿qué es el hombre [D]para que de él te acuerdes?,
[A7]O el hijo del hombre para que [D]lo estimaciones.
[G]Tú eres el Altísimo [D]que siempre atiendes,
[A7]Las oraciones de tus [D]generaciones."""),

  (209, "El Fuego Pentecostal", "Espíritu Santo", "Em", 118, "Jairo Silva",
   """[Em]El fuego pentecostal está cayendo a[B7]quí,
Llena el templo y [Em]las almas de bendición.
La promesa del Padre dada en [B7]Jerusalén,
Renueva el corazón [Em]con viva unción.

[Am]Sentimos el soplo del [Em]viento recio,
[B7]Las lenguas repartidas como de [Em]fuego.
[Am]Bendito sea el Nombre [Em]de Jesús el Salvador,
[B7]Que bautiza con Espíritu [Em]y Poder del Señor."""),

  (210, "Caminando Hacia la Patria", "Nuestra Esperanza", "G", 92, "Gabriel O. Berrio",
   """[G]Caminando voy hacia la [C]patria celestial,
Donde [D7]no hay llanto ni des[G]olación.
Allí [G]las calles son de oro de [C]brillo inmortal,
Y las [D7]puertas de perlas de [G]gran bendición.

[C]¡Oh patria querida, [G]ansiada mansión!,
[D7]Allí veré a Jesús cara a [G]cara en su trono.
[C]Caminaré con los santos [G]en dulce canción,
[D7]Para siempre vestido de [G]lino de hono."""),

  (211, "La Paz de Cristo", "Consolación", "D", 74, "Alvaro Torres",
   """[D]La paz de Cristo les de[Bm]jo en el corazón,
No [G]como el mundo la da la [A7]doy Yo a ustedes.
No se [D]turbe vuestro ser [Bm]ni tenga temor,
Sino [G]creed en mi Gracia y [A7]mis grandes [D]mercedes.

[G]Tengo paz en la tormenta, [D]tengo paz en el dolor,
[A7]Porque la mano del Señor me [D]sostiene.
[G]Su paz sobrepasa todo [D]humano entendimiento,
[A7]Y guarda mis pensamientos [D]en todo momento."""),

  (212, "Luz de la Esperanza", "Nuestra Esperanza", "C", 85, "Jose Silva",
   """[C]Una luz de esperanza [F]brilla en el confín,
Es la [G7]próxima venida de [C]nuestro Señor.
El clarín celestial reson[F]ará en su fin,
Y los [G7]santos volarán hacia [C]el Salvador.

[F]Guardemos la fe, man[C]tengamos la antorcha,
[G7]Con la mirada puesta en la [C]patria de arriba.
[F]Que nada en la tierra nos [C]quite la corona,
[G7]Premio inmarcesible que [C]Jesús nos asigna."""),

  (213, "Soberano Creador", "Adoración", "G", 68, "Gerardo Vásquez",
   """[G]Soberano Creador de los [Bm]cielos y el mar,
Tú [C]formaste los montes y la [D7]tierra entera.
Los [G]astros proclaman tu [Bm]Gloria sin par,
Y la [C]creación te adora de [D7]toda ma[G]nera.

[C]¡Cuán grandes son tus obras [G]Señor Todopoderoso!,
[D7]Justos y verdaderos son [G]tus caminos siempre.
[C]¿Quién no te temerá oh [G]Rey Majestuoso?,
[D7]Y glorificará tu Nombre [G]eternamente."""),

  (214, "Toda la Tierra Te Alabe", "Alabanza", "D", 108, "Juan Carlos Pérez",
   """[D]Toda la tierra te alabe [G]oh Señor,
Acla[A7]me a Ti con voz de [D]júbilo.
Can[D]ten la gloria de tu [G]gran amor,
Rin[A7]diendo alabanza y [D]culto.

//[G]Grandes y maravillosas [D]son tus obras,
[A7]Señor Dios Todopode[D]roso//."""),

  (215, "En la Presencia del Altísimo", "Adoración", "A", 70, "Cesia Castro",
   """[A]En la presencia del Al[D]tísimo quiero estar,
Con[E7]templando la hermosura de [A]su faz.
Entrar por sus puertas con [D]acción de gracias,
Y en [E7]sus atrios alabar su [A]paz.

[D]Porque el Señor es bueno, [A]para siempre su misericordia,
[E7]Y su verdad permanece por [A]todas las edades.
[D]Inclinémonos ante Él en [A]santa concordia,
[E7]Gozosos en sus divinas [A]bondades."""),

  (216, "Corazón Limpio", "Consagración", "G", 72, "Zacarías Palacios",
   """[G]Crea en mí oh Dios un [Bm]corazón limpio,
Y re[C]nueva un espíritu recto [D7]dentro de mí.
No me [G]eches de tu presencia [Bm]Señor,
Ni [C]quites de mi alma tu [D7]Santo Es[G]píritu.

[C]Devuélveme el gozo de [G]tu salvación,
[D7]Y espíritu noble me su[G]stente.
[C]Entonces enseñaré a los [G]transgresores tus caminos,
Y los [D7]pecadores se convertirán a [G]Ti."""),

  (217, "El Evangelio del Nombre", "Doctrina", "D", 98, "Arnulfo Linero",
   """[D]Anunciemos el evangelio del [Bm]Nombre de Jesús,
Que hay [G]un solo Dios y un solo [A7]Mediador.
Aquel [D]que dio su vida en [Bm]la cruenta cruz,
Ver[G]dadero Dios y divino [A7]Salva[D]dor.

[G]En ningún otro hay [D]salvación,
[A7]Porque no hay otro nombre bajo el [D]cielo,
[G]Dado a los hombres para [D]redención,
[A7]Sino el Nombre de Jesús [D]nuestro Consuelo."""),

  (218, "Soberano Redentor", "Agradecimiento", "C", 80, "Luz E. Cifuentes",
   """[C]Soberano Redentor de mi [F]alma,
Tú [G7]me diste la paz y la [C]calma.
En el [C]día de mi angustia me [F]oyó tu bondad,
Y me [G7]cubrió tu inmensa ver[C]dad.

[F]Te daré gracias entre [C]los pueblos Señor,
[G7]Cantaré alabanzas a Ti entre las [C]naciones.
[F]Porque grande es hasta los cielos [C]tu amor,
[G7]Y tu fidelidad llega hasta las [C]nubes."""),

  (219, "Manantial Inagotable", "Alabanza", "G", 112, "Gilberto Romero",
   """[G]Jesucristo es el manantial [Bm]inagotable,
De donde [C]fluye la gracia y el [D7]perdón.
Su [G]amor para el pecador es [Bm]incomparable,
Llenando el [C]alma de santa [D7]canción.

[C]¡Fluye agua de vida, [G]fluye sin cesar!,
[D7]Limpia la conciencia y [G]da la libertad.
[C]Acepta a Jesucristo hoy [G]en tu corazón,
Y [D7]recibirás la eterna [G]salvación."""),

  (220, "Ven Espíritu de Dios", "Espíritu Santo", "D", 75, "Marco A. Caicedo",
   """[D]Ven Espíritu de Dios y [Bm]llena mi ser,
In[G]úndame con tu gloria y [A7]tu poder.
Quiero [D]sentir la brisa de [Bm]tu presencia,
Y a[G]dorar al Señor con [A7]revere[D]ncia.

[G]Bautízame hoy con [D]fuego celestial,
[A7]Lléname de gozo inefable [D]y divino.
[G]Guíame por el camino [D]de verdad,
[A7]Y sé el faro que alumbre [D]mi destino."""),

  (221, "La Iglesia Victoriosa", "Doctrina", "G", 100, "Jairo Silva",
   """[G]La iglesia de Jesucristo es [Bm]victoriosa,
Fun[C]dada sobre la Roca [D7]Inmovible.
Las [G]puertas del infierno no [Bm]prevalecerán,
Por[C]que su Capitán es el Dios [D7]Invisi[G]ble.

[C]Marchemos con la antorcha de [G]la fe encendida,
[D7]Proclamando el mensaje de la [G]Cruz.
[C]Nuestra victoria está en [G]Él garantizada,
[D7]Triunfaremos en el Nombre [G]de Jesús."""),

  (222, "Un Cántico en la Noche", "Consolación", "C", 78, "Gabriel O. Berrio",
   """[C]Cuando las sombras cubren [F]mi sendero,
Tú [G7]me das un cántico en la [C]noche Señor.
Aunque el [C]viento sople fiero y [F]austero,
Tengo [G7]paz en tu inmenso [C]amor.

[F]Tú eres el Sol de mi [C]mañana resplendiente,
[G7]La estrella matutina de [C]mi caminar.
[F]En Ti descanso seguro [C]y paciente,
[G7]Sabiendo que nunca me vas a [C]dejar."""),

  (223, "Caminar con Jesús", "Consagración", "D", 85, "Alvaro Torres",
   """[D]Caminar con Jesús es mi [Bm]mayor anhelo,
Toma[G]do de su mano en santida[A7]d y fe.
Su [D]Palabra es la antorcha que [Bm]ilumina mi suelo,
Y me [G]guía victorioso hacia [A7]donde Él [D]fue.

[G]Quiero seguir sus pasos [D]cada día,
[A7]Fiel en el servicio y la [D]oración.
[G]Vivir para agradar a su [D]Majestad,
[A7]Y recibir en la gloria la [D]bendición."""),

  (224, "Dios de Mi Vida", "Agradecimiento", "G", 70, "Jose Silva",
   """[G]Dios de mi vida, Señor [Bm]de mi salvación,
A [C]Ti elevo mi alma en [D7]adoración.
Por [G]tus misericordias que [Bm]nuevas son hoy,
Te [C]doy infinitas gracias en [D7]donde e[G]stoy.

[C]Gracias por tu protección [G]y tu cuidado,
[D7]Gracias por la familia y por [G]el pan.
[C]Bendito seas mi Señor [G]amado,
[D7]Tus bendiciones nunca cesa[G]rán."""),

  (225, "Oh Profundo Amor de Dios", "Adoración", "A", 68, "Gerardo Vásquez",
   """[A]Oh profundo amor de Dios, [D]vasto e inmensurable,
Como el [E7]océano infinito en [A]su esplendor.
Me rodea y me sostiene [D]su Gracia inefable,
Guian[E7]do mis pasos hacia el [A]Salvador.

[D]Amor que no cambia, [A]amor inmortal,
[E7]Que dio a su Hijo por el [A]pecador.
[D]Alabemos todos al [A]Dios celestial,
[E7]Por su eterno y puro [A]amor."""),

  (226, "Firmes en la Verdad", "Doctrina", "G", 95, "Juan Carlos Pérez",
   """[G]Mantengámonos firmes en [Bm]la verdad del Nombre,
Sin [C]flaquear ante la duda ni el [D7]error.
Guardemos [G]la doctrina que transforma al [Bm]hombre,
Dada [C]por Jesucristo nuestro [D7]Salva[G]dor.

[C]Permaneced velando y [G]orando siempre,
[D7]Con la armadura de la fe en [G]arreglo.
[C]El Señor viene pronto a [G]buscar a su gente,
[D7]Un pueblo victorioso y [G]sin arruga ni sesgo."""),

  (227, "El Gran Alfarero", "Consagración", "D", 72, "Cesia Castro",
   """[D]Yo soy el barro y Tú eres [Bm]el Alfarero,
[G]Hazme a tu imagen oh divino [A7]Señor.
Mol[D]dea mi vida en el fuego [Bm]sincero,
Hasta [G]que refleje tu gracia [A7]y tu colo[D]r.

[G]Quebranta el orgullo de mi [D]corazón,
[A7]Límpiame de las escorias del [D]ayer.
[G]Hazme un vaso útil en [D]tu casa hoy,
[A7]Para tu honra y tu gloria [D]ejercer."""),

  (228, "Mi Escudo y Fortaleza", "Consolación", "G", 80, "Zacarías Palacios",
   """[G]Jehová es mi escudo y [Bm]mi fortaleza,
En [C]El confió mi corazón y [D7]fui socorrido.
Por [G]eso se gozó mi alma en [Bm]su realeza,
Y con [C]mi cántico le [D7]alabará el o[G]ído.

[C]Bendito sea el Dios de [G]mi salvación,
[D7]Que no retiró de mí su [G]misericordia.
[C]Él escuchó la voz de mi [G]oración,
[D7]Y me concedió su dulce [G]concordia."""),

  (229, "Sendas Antiguas", "Doctrina", "D", 90, "Arnulfo Linero",
   """[D]Preguntad por las sendas [Bm]antiguas del Señor,
Y [G]andad en el camino de la [A7]santidad.
Allí [D]hallaréis descanso para el [Bm]corazón,
Y [G]paz duradera en la [A7]Eterni[D]dad.

[G]No sigamos las corrientes [D]de este mundo perverso,
[A7]Mantengámonos puros ante [D]Dios.
[G]Guardando los preceptos de [D]su Santo Libro,
[A7]Escuchando atentos su divina [D]voz."""),

  (230, "Cristo Viene Otra Vez", "Nuestra Esperanza", "A", 92, "Luz E. Cifuentes",
   """[A]Cristo viene otra vez en las [D]nubes de gloria,
A [E7]llevar a su iglesia a la [A]patria celestial.
Se completará la más [D]grande historia,
Y [E7]reinaremos con Él en la [A]vida inmortal.

[D]¡Maranatha, ven Señor [A]Jesús!,
[E7]Es el clamor de la esposa que [A]espera.
[D]Vestida de lino y re[A]fulgente luz,
[E7]En el banquete del Rey sin [A]frontera."""),

  (231, "Ríos de Agua Viva", "Espíritu Santo", "G", 110, "Gilberto Romero",
   """[G]Ríos de agua viva saltan [Bm]en mi ser,
Desde [C]que el Espíritu Santo me [D7]llenó.
Tengo [G]un gozo nuevo y un [Bm]gran poder,
Que [C]Jesucristo en su amor [D7]me entre[G]gó.

[C]¡Alaba al Señor, alaba [G]su Nombre!,
[D7]Él hace maravillas en la [G]humanidad.
[C]Transforma la vida de [G]todo hombre,
Y le [D7]da la vida eterna en [G]verdad."""),

  (232, "En el Trono Celestial", "Adoración", "D", 68, "Marco A. Caicedo",
   """[D]En el trono celestial [Bm]está sentado,
El [G]Señor de señores y [A7]Rey de reyes.
Rendidos [D]ante Él los santos de [Bm]su cercado,
Obe[G]decen gozosos sus [A7]santas le[D]yes.

[G]Santo, Santo, Santo es el [D]Señor,
[A7]Digno de recibir la honra y el [D]poder.
[G]Proclamamos su gloria con [D]fervor,
[A7]Y ante su presencia nos vamos a [D]someter."""),

  (233, "Jesús Nombre Sin Igual", "Doctrina", "C", 95, "Jairo Silva",
   """[C]Jesús es el Nombre sin i[F]gual en el mundo,
Aquel [G7]que calma la tormenta del [C]mar.
Su amor para el hombre es [F]tan profundo,
Que [G7]vino a la tierra para nos [C]salvar.

[F]En Su Nombre doblaráse [C]toda rodilla,
[G7]De los que están en los cielos y en la [C]tierra.
[F]Y toda lengua confesará la [C]maravilla,
[G7]Que Jesús es el Señor de la [C]era."""),

  (234, "El Nombre Sobrenatural", "Doctrina", "G", 100, "Gabriel O. Berrio",
   """[G]Hay un Nombre sobre todo [Bm]nombre escrito en la Cruz,
Nombre [C]sobrenatural, glorioso [D7]y bendito.
Ese [G]Nombre precioso es el de [Bm]Jesús,
En [C]Quien la Deidad habita en [D7]lo infi[G]nito.

[C]En Su Nombre los demonios [G]huyen con pavor,
[D7]Los enfermos son sanados por [G]su fe.
[C]Proclamemos Su Nombre con [G]ardiente amor,
[D7]Porque Él es el Rey de la [G]Fe."""),

  (235, "Soberano Dios", "Adoración", "D", 70, "Alvaro Torres",
   """[D]Soberano Dios, Señor de [Bm]la creación,
Tu [G]Nombre es grande en toda [A7]la tierra.
Nos [D]postramos ante Ti en [Bm]humilde oración,
Invo[G]cando tu paz en medio [A7]de la gue[D]rra.

[G]Tú reinas con justicia [D]y equidad,
[A7]Tu cetro es cetro de recta [D]verdad.
[G]Te adoramos Señor [D]en santidad,
[A7]Reconocemos tu soberana [D]Majestad."""),

  (236, "Alabanza al Santo de Israel", "Alabanza", "G", 115, "Jose Silva",
   """[G]Cantemos alabanzas al [Bm]Santo de Israel,
Que ha [C]hecho proezas en favor [D7]de su pueblo.
Él [G]es nuestro Pastor y Gui[Bm]ador fiel,
Nos [C]cuida con amor en todo [D7]momen[G]to.

[C]¡Exaltad al Señor, aclamad [G]su victoria!,
[D7]Él venció a la muerte y al [G]pecado en la cruz.
[C]Canten los redimidos su [G]inmortal historia,
[D7]Caminando en las sendas de [G]su luz."""),

  (237, "El Amor de Jesucristo", "Agradecimiento", "C", 82, "Gerardo Vásquez",
   """[C]El amor de Jesucristo no [F]tiene comparación,
Es [G7]más alto que los cielos y más [C]profundo que el mar.
Él [C]buscó mi alma triste y le [F]dio la salvación,
Y me [G7]enseñó con su Gracia a [C]amar.

[F]Gracias Jesús por tu [C]sublime amor,
[G7]Que lavó las manchas de mi [C]corazón.
[F]Te entrego mi vida como [C]ofrenda de olor,
[G7]Para servirte siempre en [C]devoción."""),

  (238, "Misionero de la Cruz", "Misiones", "G", 102, "Juan Carlos Pérez",
   """[G]Señor envíame a mí como [Bm]misionero hoy,
A [C]llevar la antorcha de [D7]tu salvación.
Donde [G]haya tinieblas dispuesto [Bm]yo voy,
Procla[C]mando tu Nombre a [D7]cada na[G]ción.

[C]Heme aquí Señor, envía[G]me a mí,
[D7]Quiero ser el heraldo de [G]tu verdad.
[C]Dispenso las nuevas que un [G]día recibí,
[D7]Llevando al perdido tu gran [G]bondad."""),

  (239, "Nuestra Esperanza Bendita", "Nuestra Esperanza", "D", 88, "Cesia Castro",
   """[D]Aguardando la esperanza [Bm]bendita del Señor,
La [G]manifestación gloriosa de [A7]nuestro Gran Dios.
Jesucristo [D]el Redentor que nos [Bm]libró del temor,
Y [G]nos unió para siempre en [A7]una sola [D]voz.

[G]Nuestra patria no es esta [D]tierra de dolor,
[A7]Somos peregrinos buscando la [D]ciudad celestial.
[G]Pronto entraremos por las [D]puertas de honor,
[A7]Y viviremos con Él en la [D]paz inmortal."""),

  (240, "Alabado Sea el Redentor", "Alabanza", "A", 108, "Zacarías Palacios",
   """[A]Alabado sea el Redentor [D]de la humanidad,
A[E7]quel que en la cruz la victoria [A]ganó.
Destruyó las cadenas de [D]la iniquidad,
Y a su [E7]pueblo la vida eterna [A]le dio.

[D]¡Gloria, gloria al Nombre [A]de Jesús!,
[E7]Alabemos su santa e [A]incomparable luz.
[D]Canten los cielos y respon[A]da la tierra,
[E7]Porque el Nombre de Jesús [A]vence toda guerra."""),

  (241, "Cantaré Tu Fidelidad", "Agradecimiento", "G", 80, "Arnulfo Linero",
   """[G]Cantaré tu fidelidad [Bm]cada mañana,
Se[C]ñor de la gloria y de [D7]la creación.
Tu [G]misericordia es dulce y [Bm]humana,
Y me [C]llena de gozo la [D7]oraci[G]ón.

[C]Fiel has sido Señor [G]en todo momento,
[D7]Nunca me has dejado solo en [G]la aflicción.
[C]En tu Palabra encuentro [G]el sustento,
[D7]Y en tu presencia la eterna [G]canción."""),

  (242, "El Poder de la Oración", "Consolación", "D", 75, "Luz E. Cifuentes",
   """[D]Hay poder en la oración de [Bm]los santos,
Cuando [G]clamamos al Dios de [A7]la verdad.
Él [D]enjuga nuestras lágrimas y [Bm]nuestros llantos,
Y [G]nos concede su paz y [A7]liber[D]tad.

[G]Clama a Mí y Yo te respon[D]deré,
[A7]Y te enseñaré cosas grandes [D]y ocultas.
[G]Ésta es la promesa de nuestro [D]Rey,
[A7]Que escucha nuestras plegarias [D]y disputas."""),

  (243, "Mi Corazón Te Alaba", "Adoración", "C", 72, "Gilberto Romero",
   """[C]Mi corazón te alaba [F]Señor de los cielos,
Rendi[G7]do ante el altar de [C]tu majestad.
Sabiendo [C]que respondes a mis [F]anhelos,
Y me [G7]cubres de tu infinita [C]piedad.

[F]Santo es tu Nombre, al[C]tísimo Señor,
[G7]Digno de alabanza y de [C]adoración.
[F]A Ti sea el imperio, [C]el honor y el loor,
[G7]Por los siglos de los siglos [C]en bendición."""),

  (244, "Lléname Señor", "Espíritu Santo", "G", 70, "Marco A. Caicedo",
   """[G]Lléname Señor con [Bm]tu Espíritu Santo,
Quiero [C]sentir el fuego de [D7]tu unción.
Quita [G]de mi alma todo [Bm]quebranto,
Y de[C]rrama en mi ser tu [D7]bendici[G]ón.

[C]Como vaso de barro [G]me rindo hoy,
[D7]Moldeame Señor con tu [G]mano de amor.
[C]En tus atrios sagrados go[G]zoso estoy,
[D7]Sirviendo a mi Rey y mi [G]Salvador."""),

  (245, "Santo Espíritu Consolador", "Espíritu Santo", "D", 74, "Jairo Silva",
   """[D]Santo Espíritu Consolador [Bm]divino,
Guí[G]anos por el angosto [A7]camino.
Sé el [D]faro brillante en nuestro [Bm]destino,
Hasta [G]llegar al hogar [A7]peregri[D]no.

[G]Llénanos de gracia, [D]llénanos de paz,
[A7]Llénanos de fuerza para [D]vencer.
[G]Mirando la belleza de [D]su santa Faz,
[A7]Hasta que le veamos en [D]su aparecer."""),

  (246, "La Palabra de Verdad", "Doctrina", "G", 90, "Gabriel O. Berrio",
   """[G]La Palabra de Dios es [Bm]viva y eficaz,
Más [C]cortante que toda espada [D7]de dos filos.
Penetra [G]hasta el alma dando [Bm]firme paz,
Y de[C]scubre los pensamientos [D7]tranqui[G]los.

[C]Lámpara es a mis pies [G]tu Palabra Señor,
[D7]Y lumbrera en mi oscuro [G]camino.
[C]La guardaré en mi corazón [G]con fervor,
[D7]Para no pecar contra tu [G]Ley Divino."""),

  (247, "Sublime Redención", "Doctrina", "D", 78, "Alvaro Torres",
   """[D]Sublime redención comprada [Bm]en la cruz,
Por [G]la sangre del Inocente [A7]Cordero.
Él nos [D]trasladó de las sombras [Bm]a la luz,
Ha[G]ciéndonos herederos en [A7]el cie[D]ro.

[G]¡Oh maravilla de amor [D]celestial!,
[A7]Cristo pagó el precio de [D]mi perdón.
[G]Hoy tengo entrada libre al [D]Trono Real,
[A7]Y gozo eterno en mi [D]corazón."""),

  (248, "En las Alas de la Fe", "Consolación", "C", 82, "Jose Silva",
   """[C]En las alas de la fe me [F]levantaré,
Por en[G7]cima de la tormenta y [C]el dolor.
En las [C]promesas de Dios con[F]fiaré,
Miran[G7]do la victoria del [C]Salvador.

[F]Los que esperan en Jehová [C]tendrán nuevas fuerzas,
[G7]Levantarán alas como las [C]águilas.
[F]Correrán y no se cansa[C]rán en las pruebas,
[G7]Caminarán sin desmayar en [C]las sendas."""),

  (249, "Dios de Abraham e Isaac", "Alabanza", "G", 112, "Gerardo Vásquez",
   """[G]El Dios de Abraham, e [Bm]Isaac y Jacob,
Es [C]nuestro Dios por los siglos [D7]sin fin.
Él [G]guardó a su pueblo y los [Bm]libertó,
Con [C]su potente brazo de [D7]sera[G]fín.

[C]¡Alabad su Santo Nombre [G]con gratitud!,
[D7]Él es el mismo Dios ayer [G]y hoy.
[C]En ÉL está nuestra fuerza y [G]salud,
[D7]A ÉL rindo alabanzas en [G]donde estoy."""),

  (250, "El Pan de Vida", "Doctrina", "D", 80, "Juan Carlos Pérez",
   """[D]Jesús dijo: Yo soy el [Bm]Pan de Vida,
El que [G]a Mí viene no tendrá [A7]hambre jamás.
Y el que [D]cree en Mí sin [Bm]medida,
No [G]tendrá sed por los siglos [A7]de pa[D]z.

[G]Pan descendido del alto [D]cielo,
[A7]Que da vida y luz a la [D]humanidad.
[G]Alimenta nuestro ser en este [D]suelo,
[A7]Y nos conduce a la [D]Eternidad."""),

  (251, "Gracia Admirable", "Agradecimiento", "G", 74, "Cesia Castro",
   """[G]Gracia admirable de mi [Bm]Redentor,
Que [C]supera todo pensamiento [D7]humano.
Estando [G]muerto en delitos y [Bm]error,
Me [C]extendió su compasiva [D7]ma[G]no.

[C]Por gracia soy salvo [G]por medio de la fe,
[D7]No por obras para que nadie [G]se gloríe.
[C]Es don insigne del Señor [G]que amé,
[D7]Para que en su presencia [G]siempre confíe."""),

  (252, "Canto de Victoria", "Alabanza", "D", 118, "Zacarías Palacios",
   """[D]Canten los redimidos con [Bm]gozo y cantar,
Un [G]cántico nuevo de triun[A7]fo y victoria.
El [D]Señor ha vencido en [Bm]el alto altar,
Y [G]nos ha coronado de [A7]su glo[D]ria.

//¡Vic[G]toria en el Nombre de [D]Jesús!,
¡Vic[A7]toria por el poder de la [D]Cruz!//"""),

  (253, "El Gran Rey de Gloria", "Adoración", "A", 70, "Arnulfo Linero",
   """[A]Alzad oh puertas vuestras [D]cabezas,
Y al[E7]zaos vosotras puertas e[A]ternas.
Y entrará el Rey de [D]Gloria y grandezas,
El [E7]Señor fuerte y valiente en las [A]cavernas.

[D]¿Quién es este Rey de [A]Gloria majestuoso?,
[E7]¡Jehová de los ejércitos en [A]persona!
[D]Él es el Rey de Gloria [A]poderoso,
[E7]Que con su gracia al justo [A]corona."""),

  (254, "Ofrenda de Amor", "Consagración", "G", 72, "Luz E. Cifuentes",
   """[G]Vengo a ofrecerte Señor [Bm]mi corazón,
Como una [C]ofrenda de suave [D7]olor.
Sin [G]reservas te entrego [Bm]mi devoción,
A[C]dorándote con ardiente [D7]a[G]mor.

[C]Recibe mi vida Señor [G]en tu altar,
[D7]Haz de mi ser un templo [G]santo.
[C]Quiero alabarte y [G]siempre cantar,
[D7]Bajo la sombra de tu [G]manto."""),

  (255, "Con Cántico y Arpa", "Alabanza", "C", 110, "Gilberto Romero",
   """[C]Con cántico y arpa al[F]abemos a Dios,
Exal[G7]tando su Nombre en [C]la reunión.
Unamos [C]nuestras almas en [F]sola voz,
Dando [G7]gracias por su salva[C]ción.

[F]¡Cuán bueno es alabar al [C]Señor!,
[G7]Y cantar salmos a su Nombre [C]Altísimo.
[F]Anunciar por la mañana su [C]amor,
[G7]Y su fidelidad cada noche en [C]lo íntimo."""),

  (256, "Refugio Inmovible", "Consolación", "D", 76, "Marco A. Caicedo",
   """[D]Refugio inmovible en el [Bm]día del mal,
Es [G]nuestro Dios, castillo [A7]fuerte.
En Él [D]hallamos la paz [Bm]celestial,
Y [G]victoria sobre la [A7]muer[D]te.

[G]Aunque bramen las olas del [D]mar,
[A7]Y se estremezcan los montes [D]firmes;
[G]En Dios estamos seguros sin [D]dudar,
[A7]En su amor donde jamás te [D]deprimes."""),

  (257, "Nuestra Luz y Salvación", "Doctrina", "G", 90, "Jairo Silva",
   """[G]Jehová es mi luz y mi [Bm]salvación,
¿De [C]quién temeré en este [D7]mundo?
Jehová [G]es la fuerza de mi [Bm]corazón,
¿De [C]quién he de atemorizarme en [D7]lo profun[G]do?

[C]Una cosa he demandado a [G]Señor,
[D7]Ésta buscaré con constante [G]anhelo;
[C]Que esté yo en su casa con [G]amor,
[D7]Todos los días bajo su [G]velo."""),

  (258, "En Tu Nombre Hay Poder", "Alabanza", "D", 112, "Gabriel O. Berrio",
   """[D]En tu Nombre hay poder para [G]sanar,
En tu [A7]Nombre hay poder para [D]salvar.
En tu [D]Nombre hay poder para [G]libertar,
Y a [A7]las almas en tu gracia [D]restaurar.

//¡Je[G]sús, Nombre sin igual!,
[D]¡Jesús, Rey celestial!
[A7]A Ti sea la gloria por el bien [D]triunfal//."""),

  (259, "El Día del Señor", "Nuestra Esperanza", "A", 88, "Alvaro Torres",
   """[A]El día del Señor vendrá [D]como ladrón,
En la [E7]noche cuando nadie lo [A]espera.
Los cielos pasarán con [D]gran estruendón,
Y la [E7]tierra se fundirá [A]entera.

[D]Mas nosotros esperamos [A]cielos nuevos,
[E7]Y una nueva tierra llena de [A]justicia.
[D]Permaneced limpios y [A]sin denuedos,
[E7]Gozándoos en su divina [A]noticia."""),

  (260, "Manos Santas", "Consagración", "G", 74, "Jose Silva",
   """[G]Levantemos manos santas [Bm]al Señor,
Sin [C]ira ni contienda en [D7]el corazón.
Ador[G]ando al Padre con [Bm]sincero amor,
Lle[C]nos de su paz y [D7]bendici[G]ón.

[C]Santuario de gracia es el [G]creyente,
[D7]Templo del Espíritu Santo [G]de Dios.
[C]Caminemos rectos e in[G]ocente,
[D7]Siguiendo el llamado de su [G]voz."""),

  (261, "Fiel Es Nuestro Dios", "Agradecimiento", "D", 80, "Gerardo Vásquez",
   """[D]Fiel es nuestro Dios que nos [Bm]llamó,
A la [G]comunión con su Hijo [A7]Jesús.
En [D]sus promesas eternas nos [Bm]guardó,
En[G]viándonos el consuelo [A7]y la [D]luz.

[G]Su fidelidad dura por [D]siempre,
[A7]Sus compasiones nunca fallar[D]án.
[G]Nuevas son cada mañana [D]y presente,
[A7]Tus bendiciones nos sosten[D]drán."""),

  (262, "La Ciudad Celestial", "Nuestra Esperanza", "G", 92, "Juan Carlos Pérez",
   """[G]Vislumbro a lo lejos la [Bm]ciudad celestial,
La [C]Nueva Jerusalén de brillante [D7]esplendor.
Donde [G]no entra cosa inmunda [Bm]ni mal,
Sino los [C]inscriptos en el Libro del [D7]Salva[G]dor.

[C]Allí el árbol de vida [G]dará su fruto,
[D7]Y las hojas serán para la sanidad [G]de las naciones.
[C]No habrá más noche ni [G]luto,
[D7]Porque el Señor iluminará las [G]canciones."""),

  (263, "Gozo Inefable", "Alabanza", "C", 115, "Cesia Castro",
   """[C]Tengo un gozo inefable y [F]glorioso en mi ser,
Que el [G7]mundo no me dio ni me [C]puede quitar.
Es el [C]gozo de la salvación [F]al creer,
Que a [G7]Jesús me puedo con[C]fiar.

[F]¡Gloria a Dios por su [C]salvación!,
[G7]¡Gloria a Dios por su inmenso [C]amor!
[F]Cantaré con júbilo en [C]la reunión,
[G7]Dando loor a mi [C]Señor."""),

  (264, "Cristo la Única Esperanza", "Doctrina", "G", 88, "Zacarías Palacios",
   """[G]En un mundo sumergido en [Bm]la confusión,
Cristo [C]es la única esperanza [D7]firme y real.
Su [G]Palabra trae consuelo [Bm]y dirección,
Li[C]brando a las almas del [D7]caos mor[G]tal.

[C]Miren a Él todos los [G]términos de la tierra,
[D7]Y sed salvos dice el Señor [G]Dios.
[C]Sólo en Jesús la victoria [G]se encierra,
[D7]Escuchad con fe su dulce [G]voz."""),

  (265, "Fieles Soldados de la Fe", "Consagración", "D", 105, "Arnulfo Linero",
   """[D]Somos fieles soldados de [Bm]la fe de Jesús,
Milit[G]ando en el ejército [A7]del Señor.
Lleva[D]mos la coraza y el [Bm]casco de luz,
Y el [G]escudo de la fe contra el [A7]tentado[D]r.

[G]Combatiendo el buen combate [D]con valor,
[A7]Llegaremos hasta el fin de la [D]jornada.
[G]Y recibiremos del justo [D]Juez y Señor,
[A7]La corona de justicia [D]prometida."""),

  (266, "Alba de Paz", "Consolación", "G", 75, "Luz E. Cifuentes",
   """[G]Un alba de paz amanece [Bm]en mi alma,
Tras la [C]noche oscura de la [D7]aflicción.
Jesús [G]habló a los vientos tra[Bm]yendo la calma,
Y [C]restauró la paz en mi [D7]cora[G]zón.

[C]Gracias Señor por tu eterna [G]paz,
[D7]Que llena mi vida de gozo [G]sincero.
[C]Caminaré contemplando [G]tu Faz,
[D7]En las sendas de tu amor [G]verdadero."""),

  (267, "Toma Mi Vida Oh Señor", "Consagración", "D", 72, "Gilberto Romero",
   """[D]Toma mi vida oh Señor y [Bm]hazla tuya,
Toma [G]mis manos y mis pies para [A7]servirte.
Que [D]mi voz proclamando tu [Bm]Nombre distribuya,
Las [G]nuevas de gracia para [A7]reparti[D]rte.

[G]Toma mis labios para [D]hablar de Ti,
[A7]Toma mi mente para pensar [D]en tu Ley.
[G]Toma mi amor y ríndelo [D]aquí,
[A7]A los pies de mi glorioso [D]Rey."""),

  (268, "Eterno Redentor", "Adoración", "A", 68, "Marco A. Caicedo",
   """[A]Eterno Redentor, Dios de [D]la majestad,
Te [E7]adoramos en espíritu [A]y en verdad.
Tu [A]Nombre es excelso en la [D]creación,
Y [E7]tu Reino no tendrá [A]fin.

[D]Señor de señores, [A]Rey Supremo,
[E7]A Ti rendimos todo nuestro [A]ser.
[D]Con los ángeles cantamos [A]tu himno extremo,
[E7]Glorificando tu Santo [A]Poder."""),

  (269, "Anunciaremos Su Nombre", "Misiones", "G", 100, "Jairo Silva",
   """[G]Anunciaremos el Nombre de [Bm]Jesús el Señor,
Por [C]villas, ciudades y [D7]montañas.
Lle[G]vando el mensaje de [Bm]su gracia y amor,
Y sus [C]obras gloriosas y [D7]extra[G]ñas.

[C]¡Id y predicad a toda [G]criatura!,
[D7]El que creyere y fuere bautizado [G]será salvo.
[C]Esta es la comisión santa [G]y pura,
[D7]Dada por nuestro divino [G]Maestro."""),

  (270, "Un Banquete Celestial", "Nuestra Esperanza", "D", 85, "Gabriel O. Berrio",
   """[D]Hay un banquete celestial pre[Bm]parado allá,
Las [G]Bodas del Cordero con [A7]su Iglesia.
Donde el [D]mismo Señor nos [Bm]servirá,
Y [G]vestiremos de lino y [A7]eleganci[D]a.

[G]Dichosos los que son lla[D]mados a la cena,
[A7]De las Bodas gloriosas del [D]Señor.
[G]Allí no habrá más dolor [D]ni pena,
[A7]Sino gozo eterno e inmenso [D]amor."""),

  (271, "El Glorioso Nombre de Jesús", "Doctrina", "G", 95, "Alvaro Torres",
   """[G]El glorioso Nombre de Je[Bm]sús proclamamos,
Ú[C]nico Nombre dado para [D7]salvación.
En [G]Su Nombre oramos y a [Bm]Él alabamos,
Con [C]todo el fervor del [D7]cora[G]zón.

[C]¡En el Nombre de Jesús hay [G]victoria!,
[D7]¡En el Nombre de Jesús hay [G]libertad!
[C]Demos a Su Nombre toda la [G]gloria,
[D7]Por los siglos de la [G]Eternidad."""),

  (272, "Hasta que Él Venga", "Nuestra Esperanza", "D", 88, "Jose Silva",
   """[D]Anunciaremos la muerte del [Bm]Señor y su luz,
Y [G]proclamaremos su resurrec[A7]ción sublime.
Obe[D]deciendo sus mandatos [Bm]en la cruz,
Hasta [G]que Él venga y nos [A7]redim[D]a.

[G]Velad y orad porque [D]no sabéis la hora,
[A7]En que el Hijo del Hombre ha de [D]venir.
[G]Mantened la fe pura [D]y triunfadora,
[A7]Para con Él en la gloria [D]vivir.""")
]

print(f"Total new songs defined for 181-272: {len(songs_181_to_272_raw)}")

part10_head = """# -*- coding: utf-8 -*-

part10_songs = [
  # 161 to 180
  {
    "number": 161, "title": "Sublime Gracia", "category": "Agradecimiento", "originalKey": "G", "bpm": 70, "author": "John Newton",
    "lyrics": \"\"\"[G]Sublime gracia del Se[C]ñor,
Que a un [G]infeliz sal[D7]vó.
Fui [G]ciego mas hoy [C]veo yo,
Per[G]dido y [D7]me encon[G]tró.

Su [G]gracia me enseñó a te[C]mer,
Mis [G]dudas auyen[D7]tó.
¡Oh [G]cuán precioso [C]fue a mi ser,
Al [G]dar mi [D7]cora[G]zón!\"\"\"
  },
  {
    "number": 162, "title": "Cantaré a Jehová por Siempre", "category": "Alabanza", "originalKey": "Em", "bpm": 120, "author": "Gerardo Vásquez",
    "lyrics": \"\"\"[Em]Cantaré a Jehová por siempre,
Su diestra es todo po[B7]der.
Cantaré a Jehová por siempre,
Su diestra es todo po[Em]der.

Echó a la [Am]mar los que cabal[Em]gaban,
Echó a la [B7]mar los carros del Fara[Em]ón.
Mi padre es [Am]Dios y yo le exal[Em]taré,
Mi padre es [B7]Dios y le alaba[Em]ré.\"\"\"
  },
  {
    "number": 163, "title": "Dios Es Nuestro Amparo", "category": "Consolación", "originalKey": "G", "bpm": 80, "author": "Luz E. Cifuentes",
    "lyrics": \"\"\"[G]Dios es nuestro amparo y [Bm]fortaleza,
Nuestro [C]pronto auxilio en las tribula[D7]ciones.
Por [G]tanto no temeremos aunque la [Bm]tierra sea removida,
Y se [C]traspasen los [D7]montes al corazón del [G]mar.

[C]Jehová de los ejércitos está con no[G]sotros,
[D7]Nuestro refugio es el Dios de Ja[G]cob.\"\"\"
  },
  {
    "number": 164, "title": "Grande Es la Fidelidad", "category": "Agradecimiento", "originalKey": "D", "bpm": 75, "author": "Zacarías Palacios",
    "lyrics": \"\"\"[D]Oh Dios Eterno, tu [G]misericordia
[A7]Es nueva cada ma[D]ñana;
No [D]cambias nunca, tus [G]compasiones
[A7]No fallan jamás, mi Se[D]ñor.

[D]¡Grande es tu [Bm]fidelidad!
[G]¡Grande es tu [A7]fidelidad!
[D]Cada mañana re[G]nuevo amor veo,
[A7]Tu fidelidad grande es Se[D]ñor.\"\"\"
  },
  {
    "number": 165, "title": "En Cristo la Roca", "category": "Doctrina", "originalKey": "G", "bpm": 90, "author": "Juan Carlos Pérez",
    "lyrics": \"\"\"[G]En Cristo la roca de los [C]siglos
Pongo toda mi con[D7]fianza;
En [G]ningún otro nombre hay salva[C]ción,
Sólo en [D7]Cristo mi Salva[G]dor.

[C]Roca eterna, [G]firme refugio,
En [D7]las tormentas me guarda[G]rá;
[C]Roca eterna, [G]mi fortaleza,
En [D7]El mi alma segura es[G]tá.\"\"\"
  },
  {
    "number": 166, "title": "A Ti Atribuimos la Gloria", "category": "Adoración", "originalKey": "C", "bpm": 68, "author": "Cesia Castro",
    "lyrics": \"\"\"[C]A Ti atribuimos la [F]gloria,
A [G7]Ti atribuimos la [C]honra;
A [C]Ti atribuimos el [F]imperio,
Por[G7]que eres Santo, Se[C]ñor.

[F]Santo eres [C]Tú,
[G7]Digno de adora[C]ción;
[F]Santo eres [C]Tú,
[G7]Dios de la crea[C]ción.\"\"\"
  },
  {
    "number": 167, "title": "Tu Fidelidad Es Grande", "category": "Agradecimiento", "originalKey": "D", "bpm": 70, "author": "Gerardo Vásquez",
    "lyrics": \"\"\"[D]Tu fidelidad es [Bm]grande,
Tu [G]fidelidad incompa[A7]rable es;
Nadie [D]hay como Tú, bendito [Bm]Dios,
[G]Grande es tu [A7]fide[D]lidad.

//Se[G]ñor tu gracia me al[D]canzó,
Tu [A7]amor mi vida transfor[D]mó//.\"\"\"
  },
  {
    "number": 168, "title": "Cuán Bello Es el Señor", "category": "Adoración", "originalKey": "G", "bpm": 72, "author": "Jairo Silva",
    "lyrics": \"\"\"[G]Cuán bello es el Se[Bm]ñor,
[C]Cuán hermoso es el Se[D7]ñor.
[G]Cuán bello es el Se[Bm]ñor,
[C]Hoy le [D7]quiero adora[G]r.

[C]La belleza de mi Se[G]ñor
[D7]Nunca se agota[G]rá;
[C]La hermosura de mi Se[G]ñor
[D7]Siempre resplandece[G]rá.\"\"\"
  },
  {
    "number": 169, "title": "Hay Poder en Jesús", "category": "Alabanza", "originalKey": "G", "bpm": 110, "author": "Arnulfo Linero",
    "lyrics": \"\"\"[G]Hay poder, poder, sin igual po[C]der,
En Jesús [G]que murió;
[G]Hay poder, poder, sin igual po[C]der,
En la [D7]sangre que Él ver[G]tió.

¿Quieres [C]ser salvo de [G]toda maldad?
[D7]Tan sólo hay poder en Je[G]sús;
¿Quieres [C]vivir en [G]santa libertad?
[D7]Acude al poder de la [G]cruz.\"\"\"
  },
  {
    "number": 170, "title": "Dios de Incomparable Amor", "category": "Adoración", "originalKey": "D", "bpm": 75, "author": "Zacarías Palacios",
    "lyrics": \"\"\"[D]Dios de incomparable a[Bm]mor,
Rendi[G]dos estamos ante [A7]Ti;
Tú [D]eres el Creador y [Bm]Señor,
El [G]Alfa y O[A7]mega sin [D]fin.

[G]Adoramos tu [D]Santo Nombre,
[A7]Magnificamos tu majes[D]tad;
[G]No hay otro Dios entre los [D]hombres,
Lleno de [A7]gracia y ver[D]dad.\"\"\"
  },
  {
    "number": 171, "title": "El Nombre de Jesús", "category": "Doctrina", "originalKey": "C", "bpm": 95, "author": "Marco A. Caicedo",
    "lyrics": \"\"\"[C]En el Nombre de Je[F]sús hay potencia,
[G7]En el Nombre de Jesús hay salva[C]ción;
En el [C]Nombre de Jesús hay cle[F]mencia,
Y en Su [G7]Nombre hay per[C]dón.

¡[F]Nombre sobre todo [C]nombre!,
[G7]En los cielos y en la [C]tierra;
¡[F]Nombre glorioso de [C]hombre!,
Que [G7]vence toda gue[C]rra.\"\"\"
  },
  {
    "number": 172, "title": "Alabaré a Mi Señor", "category": "Alabanza", "originalKey": "G", "bpm": 120, "author": "Gerardo Vásquez",
    "lyrics": \"\"\"[G]Alabaré, alabaré,
[C]Alabaré a mi Se[G]ñor.
Alaba[G]ré, alaba[Em]ré,
[D7]Alabaré a mi Se[G]ñor.

Juan vio el [G]número de los redimidos,
Y [C]todos alababan al Se[G]ñor;
Unos can[G]taban, otros o[Em]raban,
Pero [D7]todos alababan al Se[G]ñor.\"\"\"
  },
  {
    "number": 173, "title": "Confiaré en Ti", "category": "Consolación", "originalKey": "C", "bpm": 75, "author": "Cesia Castro",
    "lyrics": \"\"\"[C]Confiaré en Ti cuando [Am]todo falle,
Con[Dm]fiaré en Ti en la sombra del [G7]valle.
Tú [C]eres mi roca y mi [Am]escudo fiel,
Y mi [Dm]corazón en Ti se [G7]goza Señor.

Con[C]fiaré en Ti, Débil [Dm]soy pero fuerte seré
En el po[G7]der de mi Se[C]ñor;
Con[F]fiaré en [E7]Ti.\"\"\"
  },
  {
    "number": 174, "title": "Maravilloso Dios", "category": "Alabanza", "originalKey": "G", "bpm": 110, "author": "Gerardo Vásquez",
    "lyrics": \"\"\"[G]Maravilloso Dios, glorioso Salva[C]dor,
Eres [D7]digno de toda adora[G]ción.
Tú [G]creaste los cielos, la tierra y el [C]mar,
Y a tu [D7]pueblo compraste en la [G]cruz.

//[C]Te alabamos, Señor, [G]te glorificamos,
[D7]Por los siglos de los siglos, A[G]mén//.\"\"\"
  },
  {
    "number": 175, "title": "En Tus Manos Señor", "category": "Consagración", "originalKey": "D", "bpm": 72, "author": "Zacarías Palacios",
    "lyrics": \"\"\"[D]En tus manos, Señor, pongo mi [Bm]vida,
[G]Haz de mí lo que sea tu volun[A7]tad.
[D]Moldea mi corazón como el al[Bm]farero,
Y [G]hazme un vaso de [A7]honra y santi[D]dad.

[G]Toma mi vida, [D]toma mi ser,
[A7]Lléname de tu poder y a[D]mor;
[G]Quiero servirte [D]fiel hasta el fin,
[A7]Mi Jesucristo y Se[D]ñor.\"\"\"
  },
  {
    "number": 176, "title": "Yo Me Gozo en el Señor", "category": "Alabanza", "originalKey": "G", "bpm": 115, "author": "Juan Carlos Pérez",
    "lyrics": \"\"\"[G]Yo me gozo en el Señor porque El me ha sal[C]vado,
Me sacó de las [D7]tinieblas a su luz admira[G]ble.
[G]Puso un cántico nuevo en mi [C]boca hoy,
Cántico de [D7]alabanza a nuestro [G]Dios.

//¡[C]Gozo hay en mi [G]alma!,
¡[D7]Gozo que me da mi Salva[G]dor!//\"\"\"
  },
  {
    "number": 177, "title": "A la Presencia de Dios", "category": "Adoración", "originalKey": "C", "bpm": 70, "author": "Cesia Castro",
    "lyrics": \"\"\"[C]Vengo a la presencia de Dios con [F]humildad,
Bus[G7]cando su gracia y su ver[C]dad.
Pos[C]trado a sus pies le entrego mi [F]ser,
Por[G7]que El es mi Rey y mi Haced[C]or.

[F]Santo es tu Nombre, [C]Señor de señores,
[G7]Santo es tu Nombre, Rey del uni[C]verso;
[F]Santo es tu Nombre, [C]amante Redentor,
[G7]Digno de toda adora[C]ción.\"\"\"
  },
  {
    "number": 178, "title": "La Victoria Es Nuestra", "category": "Alabanza", "originalKey": "D", "bpm": 115, "author": "Gerardo Vásquez",
    "lyrics": \"\"\"[D]La victoria es nuestra en el Nombre de Je[A7]sús,
El enemigo está bajo nuestros [D]pies.
[D]Ningún arma contra nosotros prospe[G]rará,
Por[A7]que Jehová es nuestro Capi[D]tán.

//¡Vic[G]toria, victoria!, [D]cantamos hoy,
En el [A7]Nombre victorioso del Se[D]ñor//.\"\"\"
  },
  {
    "number": 179, "title": "Jesús Es el Camino", "category": "Doctrina", "originalKey": "G", "bpm": 95, "author": "Arnulfo Linero",
    "lyrics": \"\"\"[G]Jesús dijo: Yo soy el camino,
La ver[D7]dad y la vida eternal.
Nadie [G]viene al Padre sino por [C]Mí,
Dice el [D7]Santo e Incomparable Se[G]ñor.

[C]Sigue el camino de [G]Cristo,
[D7]El te llevará a la salva[G]ción;
[C]Sigue el camino de [G]Cristo,
[D7]Y vivirás en la patria celes[G]tial.\"\"\"
  },
  {
    "number": 180, "title": "Subiré a la Montaña", "category": "Consolación", "originalKey": "D", "bpm": 80, "author": "Gilberto Romero",
    "lyrics": \"\"\"[D]Subiré a la montaña de Jeho[G]vá,
Al lu[A7]gar donde habita su majes[D]tad.
Con [D]manos limpias y puro cora[G]zón,
Bus[A7]caré la presencia del Se[D]ñor.

[G]Allí recibiré la bendi[D]ción,
Y la [A7]justicia del Dios de mi salva[D]ción;
[G]Allí adoraré a mi Salva[D]dor,
Por [A7]siempre alabando su a[D]mor.\"\"\"
  },
"""

songs_code = []
for item in songs_181_to_272_raw:
    num, title, cat, key, bpm, author, lyrics = item
    obj_str = f"""  {{
    "number": {num}, "title": "{title}", "category": "{cat}", "originalKey": "{key}", "bpm": {bpm}, "author": "{author}",
    "lyrics": \"\"\"{lyrics}\"\"\"
  }}"""
    songs_code.append(obj_str)

full_content = part10_head + ",\n".join(songs_code) + "\n]\n"

with open("data_part10.py", "w", encoding="utf-8") as f:
    f.write(full_content)

print("Successfully updated /data_part10.py with 112 songs!")
