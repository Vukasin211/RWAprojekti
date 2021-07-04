export class testModel
{
    id: number;
    naziv: string;
    ocena: number;
    adresa: string;
    telefon: string;
    dogadjaj: string;
    mapaLokacija: string;
    ukupanKapacitet: number;
    radnoVreme: string;
    galerija: string[];
    
    constructor()
    {
        this.id = 0;
        this.naziv = "DraganovLokal";
        this.ocena = 0;
        this.adresa = "Neki";
        this.telefon = "asdfasddf";
        this.dogadjaj = "Draganov rodjendan u nedelju";
        this.mapaLokacija = "https://soseska-gradisce.si/wp-content/uploads/cache/images/jezero/jezero-881945924.jpg";
        this.ukupanKapacitet = 64;
        this.radnoVreme = "ZauvekRadi";
        this.galerija = ["https://www.navidiku.rs/firme/googlemape/ruzveltova-2-beograd.png"];
    }
}