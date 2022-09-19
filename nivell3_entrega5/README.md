Nivell 3 entrega 5:
Crea una funció que creï dos fitxers codificats en hexadecimal i en base64
respectivament, a partir del fitxer del nivell 1.

Crea una funció que guardi els fitxers del punt anterior, ara encriptats 
amb l'algoritme aes-192-cbc, i esborri els fitxers inicials.

Crea una altra funció que desencripti i descodifiqui els fitxers de 
l'apartat anterior tornant a generar una còpia de l'inicial.

Inclou un README amb instruccions per a l'execució de cada part.

/////////////

Per provar-lo cal que creïs un arxiu en aquest directori i li passis el nom
del arxiu per la linia de comandos.
El encode generara dos arxius nous amb els nous encodings,
el encrypt esborrara el arxiu original i deixarà l'encriptat i el 
decrypt generarà (o sobreescriura) un arxiu 'lastDecryption'
si li passes 'base64' o 'hex' com a segon argument, també
desencodara el output.
"tot" es un script de bash que hauria de provar totes les funcions