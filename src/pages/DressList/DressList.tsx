import {
  Chip,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon, EyeIcon } from "../../assets/svg";
import { DressModel, DressType } from "../../domain";
import { formtDate } from "../../services/formtDate";
import { getDress } from "../../services/getDress";
import { ColumnData, columns } from "./data";

const DressList: FC = () => {
  const [dresses, setDresses] = useState<DressModel[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const runOnce = useRef(false);
  const rowsPerPage = 10;

  const navigate = useNavigate();

  const pages = Math.ceil(dresses.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return dresses.slice(start, end);
  }, [page, dresses]);

  useEffect(() => {
    const getDressesList = async () => {
      setIsLoading(true);
      const dressesModel = await getDress();
      setIsLoading(false);
      setDresses(dressesModel as DressModel[]);
    };
    if (runOnce.current === false) {
      getDressesList();
    }

    return () => {
      runOnce.current = true;
    };
  }, []);

  const renderCell = useCallback(
    (address: DressModel, columnKey: string) => {
      switch (columnKey) {
        case "model": {
          return (
            <div className="flex flex-row">
              <div className=" w-32 pr-2">
                <h3 className=" font-bold">{address.model}</h3>
                <p>{address.type === DressType.WOMEN ? "MUJER" : "NIÑA"}</p>
              </div>
              {address.colors.map((color) => (
                <User
                  key={color.color}
                  avatarProps={{ radius: "none", src: color.image }}
                  description=""
                  name=""
                />
              ))}
            </div>
          );
        }
        case "hide":
          return (
            <Chip
              className="capitalize"
              color={address.hide ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {address.hide ? "Sí" : "No"}
            </Chip>
          );
        case "price":
          return address.price;
        case "size":
          return address.sizes.join(", ");
        case "create":
          return formtDate(address.createdAt);
        case "modif":
          return formtDate(address.modifiedAt);
        case "popular":
          return (
            <Chip
              className="capitalize"
              color={address.isPopular ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {address.isPopular ? "Sí" : "No"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Detalles">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Editar modelo">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() =>
                    navigate("/dress-add", { state: { dress: address } })
                  }
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar modelo">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return "";
      }
    },
    [navigate]
  );

  return (
    <Table
      aria-label="Example table with custom cells"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader columns={columns}>
        {(column: ColumnData) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={items}
        loadingState={isLoading ? "loading" : "idle"}
        loadingContent={<Spinner />}
      >
        {(item: DressModel) => (
          <TableRow key={`${item.model}-${item.type}`}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey as string)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DressList;
