export interface IAddress {
    street: string;
    zip: string;
    colonia: string;
    city: string;
    state: string;
    country: string;
    inner_number: string;
    outer_number: string;
}


export interface IRFC {
    rfc: string;
    razonSocial?: string;
    name: string;
    receiver: string;
    address?: IAddress;
}

export class RFC implements IRFC {
    rfc: string;
    razonSocial: string;
    name: string;
    receiver: string;
    address: IAddress = {
        street: '',
        zip: '',
        colonia: '',
        city: '',
        state: '',
        country: '',
        inner_number: '',
        outer_number: '',
    }
    constructor() {
        this.address.outer_number = '';
        this.address.street = '';
        this.address.colonia = '';
        this.address.city = '';
        this.address.state = '';
        this.address.country = '';
        this.address.zip = '';
    }

    public addAddresComponents(components: any[]) {
        this.address.outer_number = components[0].long_name;
        this.address.street = components[1].long_name;
        this.address.colonia = components[2].long_name;
        this.address.city = components[3].long_name;
        this.address.state = components[4].long_name;
        this.address.country = components[5].long_name;
        this.address.zip = components[6].long_name;
    }

    get addressComponents() {
        return this.address;
    }

    formData(data: any) {
        console.log(data);
        this.razonSocial = data.razonSocial;
        this.name = data.name;
        this.receiver = data.receiver;
        this.rfc = data.rfc;
    }

}