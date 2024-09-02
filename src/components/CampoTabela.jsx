import React, { useContext, useEffect, useRef, useState } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  ptBR,
  useGridApiRef,
} from "@mui/x-data-grid";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Papa from "papaparse";
import { FiltroContext } from "../context/FiltroContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const CampoTabela = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const filtroContext = useContext(FiltroContext);
  const [selectionModel, setSelectionModel] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(
    (props.columns ?? []).reduce((objetoResultado, item) => {
      objetoResultado[item.field] = true;
      return objetoResultado;
    }, {})
  );
  const apiRef = useGridApiRef();
  const inputRef = useRef(null);
  const [pageSize, setPageSize] = useState(props.linhas ?? 0);
  const [page, setPage] = useState(props.pagina ?? 0);
  const [rowsTabela, setRowsTabela] = useState(props.rowss);
  const [rowCountState, setRowCountState] = useState(props.total ?? 0);
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbar
          sx={{
            "& .MuiSvgIcon-root": {
              color: colors.grey[100],
            },
            "& .MuiButton-text": {
              color: colors.grey[100],
              backgroundColor: colors.blueAccent[600],
              marginRight: "5px",
              padding: "10px 20px",
            },
            "& .MuiButton-text:hover": {
              backgroundColor: colors.greenAccent[600],
            },
            marginBottom: "5px",
          }}
          csvOptions={{
            disableToolbarButton: true,
          }}
          printOptions={{
            disableToolbarButton: true,
          }}
        />
      </GridToolbarContainer>
    );
  };

  const handlePage = (paginas) => {
    setSelectionModel([]);
    props.changePage(paginas);
    setPage(paginas);
  };

  const handleLinhas = (linhas) => {
    setSelectionModel([]);
    setPage(0);
    props.changePage(0);
    props.changeLinhas(linhas);
    setPageSize(linhas);
  };

  const handleFiltro = (filtro) => {
    setSelectionModel([]);
    props.changeFiltro(filtro);

    let filter =
      filtro.items.length > 0
        ? {
            field: filtro.items[0].columnField,
            operator: filtro.items[0].operatorValue,
            value:
              filtro.items[0].columnField === "data" ||
              filtro.items[0].columnField === "data_criacao"
                ? filtro.items[0].value +
                  retornaTimeZone(
                    new Date(filtro.items[0].value).getTimezoneOffset() / 60
                  )
                : filtro.items[0].value,
          }
        : {
            field: "",
            operator: "",
            value: "",
          };
    try {
      console.log("Usando filtro", filter);
      filtroContext.dispatch({ type: "incrementarFiltro", value: filter });
    } catch (error) {
      console.log(error);
    }
  };

  const retornaTimeZone = (fuso) => {
    switch (fuso) {
      case 2:
        return "-02:00";
      case 3:
        return "-03:00";
      case 4:
        return "-04:00";
      case 5:
        return "-05:00";
      default:
        return "00:00";
    }
  };

  const handleFile = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const columnArray = [];
        const valuesArray = [];
        result.data.map((d) => {
          columnArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        props.setDados(result.data);
      },
    });
  };

  const apagaDados = () => {
    inputRef.current.value = null;
    props.limpaTabela();
  };

  useEffect(() => {
    setSelectionModel([]);
  }, [props.dataInicial, props.dataFinal]);

  useEffect(() => {
    const savedModel = localStorage.getItem(
      `columnVisibilityModel-${props.titulo}`
    );
    if (savedModel) {
      setColumnVisibilityModel(JSON.parse(savedModel));
    } else {
      (props.columns ?? []).reduce((objetoResultado, item) => {
        objetoResultado[item.field] = true;
        return objetoResultado;
      }, {});
    }
  }, [props.columns]);

  useEffect(() => {
    localStorage.setItem(
      `columnVisibilityModel-${props.titulo}`,
      JSON.stringify(columnVisibilityModel)
    );
  }, [columnVisibilityModel]);

  useEffect(() => {
    setRowsTabela(props.rowss);
    setRowCountState((prevRowCountState) =>
      props.total !== undefined ? Number(props.total) : prevRowCountState ?? 0
    );
    setPage(props.pagina);
  }, [props.rowss, props.total, setRowCountState, props.pagina]);

  return (
    <Box
      height="63vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
      }}
    >
      <DataGrid
        {...(props.orderByProps
          ? {
              initialState: {
                sorting: {
                  sortModel: [{ field: props.field, sort: props.sort }],
                },
              },
            }
          : {})}
        {...(props.checkboxSelection
          ? {
              checkboxSelection: true,
              onSelectionModelChange: (newRowSelectionModel) => {
                setSelectionModel(newRowSelectionModel);
                props.onRowSelectionModelChange(newRowSelectionModel);
              },
              selectionModel: selectionModel,
            }
          : {})}
        rowHeight={60}
        sx={{
          "& .MuiButton-text": { fontSize: "12px", height: "10px" },
          "& .MuiButton-iconButtonContainer": { color: "black" },
          "& .MuiDataGrid-footerContainer": {
            maxHeight: 20,
            padding: 0,
            margin: 0,
            "& p": {
              fontSize: "12px",
              margin: 0,
              padding: 0,
            },
          },
          border: "0px solid transparent",
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => {
          const colunasVisiveis = (props.columns ?? []).reduce(
            (objetoResultado, item) => {
              objetoResultado[item.field] = true;
              return objetoResultado;
            },
            {}
          );
          if (Object.keys(newModel).length === 0) {
            setColumnVisibilityModel(colunasVisiveis);
            return;
          }
          const visibilityModel = { ...columnVisibilityModel, ...newModel };
          setColumnVisibilityModel(visibilityModel);
        }}
        apiRef={apiRef}
        rows={rowsTabela}
        {...props}
        disableVirtualization
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        page={page}
        pageSize={pageSize}
        onPageChange={(page) => {
          handlePage(page);
        }}
        paginationMode={props.serverOrder ? "server" : "client"}
        sortingMode={props.serverOrder ? "server" : "client"}
        rowCount={rowCountState}
        onPageSizeChange={(newPageSize) => {
          handleLinhas(newPageSize);
        }}
        {...(props.serverOrder
          ? {
              onSortModelChange: (sort) => props.changeOrder(sort[0]),
            }
          : {})}
        rowsPerPageOptions={[25, 50, 100]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        style={{
          height: props.altura ? props.altura : "100%",
          width: props.largura ? props.largura : null,
        }}
        components={{
          Toolbar: props.toolbarFlag ? null : CustomToolbar,
        }}
        density="compact"
        filterMode={props.serverOrder ? "server" : "client"}
        onFilterModelChange={(filtro) => handleFiltro(filtro)}
        hideFooterRowCount={props.escondeContadorDeLinha ? true : false}
        hideFooterPagination={props.escondePaginacao ? true : false}
        hideFooter={props.escondeRodaPe ? true : false}
        disableColumnFilter={props.escondeFiltro ? true : false}
      />
      <button
        style={{
          display: props.importar ? "inline-flex" : "none",
          marginRight: "10px",
          float: "right",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          boxSizing: "border-box",
          backgroundColor: colors.blueAccent[700],
          outline: 0,
          border: 0,
          margin: "5px 1px",
          padding: 5,
          cursor: "pointer",
          userSelect: "none",
          verticalAlign: "middle",
          textDecoration: "none",
          fontWeight: 500,
          fontSize: "0.8125rem",
          lineHeight: 1.75,
          letterSpacing: "0.02857em",
          textTransform: "uppercase",
          minWidth: "64px",
          borderRadius: "10px",
          color: colors.grey[200],
        }}
        type="button"
        onClick={() => {
          return false;
        }}
      >
        <UploadFileIcon
          style={{ fontSize: "17px", marginRight: "5px", marginLeft: "5px" }}
        />
        <label
          htmlFor="getFile"
          style={{ marginTop: "5px", cursor: "pointer" }}
        >
          Importar .csv
        </label>
      </button>
      <input
        ref={inputRef}
        id="getFile"
        type="file"
        name="file"
        accept=".csv"
        onChange={handleFile}
        style={{ display: "none" }}
      />

      <button
        style={{
          display: props.limpar ? "inline-flex" : "none",
          marginRight: "10px",
          float: "right",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          boxSizing: "border-box",
          backgroundColor: colors.blueAccent[700],
          outline: 0,
          border: 0,
          margin: "5px 1px",
          padding: 5,
          cursor: "pointer",
          userSelect: "none",
          verticalAlign: "middle",
          textDecoration: "none",
          fontWeight: 500,
          fontSize: "0.8125rem",
          lineHeight: 1.75,
          letterSpacing: "0.02857em",
          textTransform: "uppercase",
          minWidth: "64px",
          borderRadius: "10px",
          color: colors.grey[200],
        }}
        type="button"
        onClick={() => apagaDados()}
      >
        <DeleteIcon
          style={{ fontSize: "17px", marginRight: "5px", marginLeft: "5px" }}
        />
        <label style={{ marginTop: "5px", cursor: "pointer" }}>
          Limpar Dados
        </label>
      </button>
    </Box>
  );
};
export default CampoTabela;
