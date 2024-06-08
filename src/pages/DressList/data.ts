export interface ColumnData {
  name: string;
  uid: string;
}

const columns: ColumnData[] = [
  { name: "Modelo", uid: "model" },
  { name: "Precio", uid: "price" },
  { name: "Tallas", uid: "size" },
  { name: "Oculto", uid: "hide" },
  { name: "Popular", uid: "popular" },
  { name: "Creado", uid: "create" },
  { name: "Modificado", uid: "modif" },
  { name: "Acciones", uid: "actions" },
];

export { columns };

