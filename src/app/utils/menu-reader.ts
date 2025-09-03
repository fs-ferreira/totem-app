import * as XLSX from 'xlsx';
import { MenuItem } from '../core/model/menu-item';

export async function loadMenu(type: string): Promise<MenuItem[]> {
    const response = await fetch('/menu_template.xlsx');
    const arrayBuffer = await response.arrayBuffer();

    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);

    const filtered = rows.filter(r => r["Tipo"]?.toLowerCase() === getIdFrom(type));

    const grouped: { [produto: string]: MenuItem } = {};

    filtered.forEach(r => {
        const produto = r["Produto"];
        if (!grouped[produto]) {
            grouped[produto] = {
                name: produto,
                price: r["Preço"],
                quantity: 0,
                children: []
            };
        }
    

        if (r["Sabor"]) {
            grouped[produto].children!.push({
                name: r["Sabor"],
                quantity: 0
            });
        }
    });

    return Object.values(grouped);
}


function getIdFrom(type: string) {
    let id = ''
    switch (type.toLowerCase()) {
        case 'food':
            id = 'comida'
            break;
        case 'drink':
            id = 'bebida'
            break;
        case 'dessert':
            id = 'doce'
            break;
    }

    return id.toLowerCase();
}