"use client";

// ** react
import { Fragment, useState, MouseEvent, ChangeEvent, useEffect } from "react";

// ** next
import Image from "next/image";

// ** third party
import { useQueryClient } from "@tanstack/react-query";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { useSnackbar } from "notistack";

// ** mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
import { PopoverPosition } from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import CircularProgress from '@mui/material/CircularProgress';

// icons
import FolderIcon from "@mui/icons-material/Folder";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// ** models
import FileModel, { FileListQueryModel } from "@/models/FileModel";
import { OrderType } from "@/models/enums";
import ListResponseModel from "@/models/ListResponseModel";

// ** components
import FileBrowserIcon from "@/components/admin/shared/file-browser/Icons";
import EditFile from "@/components/admin/files/EditFile";
import Pagination from "@/components/Pagination";

// ** utils
import { isImageFile } from "@/utils/MimeTypeNames";
import generateFileUrl from "@/utils/GenerateFileUrl";

// ** service
import FileService from "@/services/FileService";

// ** config
import { PAGE_SIZE, QUERY_NAMES } from "@/config";

// ** hooks
import useComponentContext from "@/hooks/useComponentContext";
import useFileQuery from "@/hooks/queries/useFileQuery";

const FileItemBoxStyled = styled(Box)(({}) => ({
  width: "100%",
  height: "140px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const DragAndDropWrapperStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 0,
  top: 0,
  borderWidth: "2px",
  borderStyle: "dashed",
  borderColor: theme.palette.secondary.main,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const ToggleButtonStyled = styled(ToggleButton)(({ theme }) => ({
  width: "100px",
  height: "100px",
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  "& .MuiTypography-root": {
    fontSize: "12px",
    overflow: "hidden",
    width: "100%",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

export type FileBrowserProps = {
  enableSelectedFiles?: boolean;
  handleSelectFilesChange?: (files: FileModel[]) => void;
  selectedFiles?: FileModel[];
};
type UploadingFilesProps = {
  name: string;
  size: number;
  waiting: boolean;
  uploading: boolean;
};

export default function FileBrowser({
  enableSelectedFiles = false,
  handleSelectFilesChange = undefined,
  selectedFiles = new Array<FileModel>(),
}: FileBrowserProps) {
  const [params, setParams] = useState<FileListQueryModel>({
    page: 1,
    pageSize: PAGE_SIZE,
    folderId: null,
    order: "isFolder",
    orderBy: OrderType.ASC,
  });

  const [selectFiles, setSelectFiles] = useState(selectedFiles);

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { setFormDrawerData, setConfirmDialogData, handleConfirmDialogClose } =
    useComponentContext();

  const { useFilesQuery } = useFileQuery(params);

  const files = useFilesQuery();
  const data = files.data?.data as ListResponseModel<FileModel[]>;
  const loading = files.isLoading || files.isFetching;

  const [path, setPath] = useState<string | null>(null);
  const [selectFolders, setSelectFolders] = useState(new Array<FileModel>());
  const [uploadingFiles, setUploadingFiles] = useState(
    new Array<UploadingFilesProps>()
  );
  const [contextMenu, setContextMenu] = useState<PopoverPosition | null>(null);
  const [contextMenuData, setContextMenuData] = useState<FileModel | null>(
    null
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // useEffect(() => {
  //   setSelectFiles(selectedFiles || []);
  // }, [selectedFiles]);

  useEffect(() => {
    const _path =
      selectFolders.length > 0
        ? selectFolders[selectFolders.length - 1].path
        : null;
    setPath(_path);
  }, [selectFolders]);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [NativeTypes.FILE],
    canDrop() {
      return true;
    },
    collect: (monitor: DropTargetMonitor) => {
      const item: { files: File[] } | null = monitor.getItem();
      if (item?.files && item.files.length > 0) {
        handleFilesUpload(item.files);
      }
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });

  // variables
  const dragAndDropActive = canDrop && isOver;
  const isLoading = loading || uploadingFiles.length > 0;

  const handleFilesUpload = async (files: File[]) => {
    const uploadedFiles = [];
    const _uploadingFiles = files.map(({ name, size }) => ({
      name,
      size,
      waiting: true,
      uploading: false,
    }));
    setUploadingFiles([..._uploadingFiles]);

    for await (const file of files) {
      const index = _uploadingFiles.findIndex(
        (f) => f.name === file.name && f.size === file.size
      );
      _uploadingFiles[index] = {
        ..._uploadingFiles[index],
        waiting: false,
        uploading: true,
      };
      setUploadingFiles([..._uploadingFiles]);
      const response = await FileService.uploadFile(file, path);

      enqueueSnackbar(`"${response[0].filename}" uploaded.`, {
        variant: "success",
      });

      uploadedFiles.push(response[0]);

      _uploadingFiles[index] = {
        ..._uploadingFiles[index],
        waiting: false,
        uploading: false,
      };
      setUploadingFiles([..._uploadingFiles]);
    }

    setUploadingFiles([]);
    setParams({
      ...params,
      page: 1,
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_NAMES.FILES],
    });
  };

  const handleBreadcrumbClick = (folder: FileModel | null) => {
    setParams({
      ...params,
      folderId: folder?._id || null,
    });

    if (!folder) {
      setSelectFolders([]);
    } else {
      const newSelectFolders = [...selectFolders];
      const findIndex = newSelectFolders.findIndex((f) => f._id === folder._id);
      newSelectFolders.splice(findIndex + 1);
      setSelectFolders(newSelectFolders);
    }
  };

  const handleFolderClick = (folderId: string) => {
    const findFolderData = data.results.find((item) => item._id === folderId);
    setParams({
      ...params,
      folderId,
    });
    if (findFolderData) {
      setSelectFolders([...selectFolders, ...[findFolderData]]);
    }
  };

  const handleContextMenu = (
    event: MouseEvent<HTMLButtonElement>,
    file: FileModel
  ) => {
    event.preventDefault();
    setContextMenuData(file);
    setContextMenu(
      contextMenu === null
        ? {
            left: event.clientX + 2,
            top: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };

  const handleMenuClose = () => {
    setContextMenuData(null);
    setContextMenu(null);
  };

  const handleClickDownloadMenuItem = () => {};

  const handleClickCopyUrlMenuItem = () => {
    if (!contextMenuData) return;
    const fileUrl = generateFileUrl(contextMenuData);
    navigator.clipboard.writeText(fileUrl);
    enqueueSnackbar('File URL copied to clipboard!', { variant: 'success' });
    handleMenuClose();
  };

  const handleClickEditMenuItem = () => {
    if (!contextMenuData) return;
    handleMenuClose();
    setFormDrawerData({
      open: true,
      title: `${contextMenuData.filename || contextMenuData.title}`,
      content: (
        <EditFile data={contextMenuData} isFolder={contextMenuData.isFolder} />
      ),
      submitButtonText: "Save",
      submit: false,
    });
  };

  const handleClickDeleteMenuItem = () => {
    setConfirmDialogData({
      open: true,
      title: "Are you sure?",
      content: "Please confirm to delete the selected items.",
      handleConfirmFunction: handleConfirmDelete,
    });
  };

  const handleConfirmDelete = async () => {
    if (!contextMenuData) return;
    handleMenuClose();
    await FileService.deleteItem(contextMenuData._id);

    queryClient.invalidateQueries({
      queryKey: [QUERY_NAMES.FILES],
    });

    enqueueSnackbar(
      `The selected ${
        contextMenuData.isFolder ? "folder" : "file"
      } has been successfully deleted.`,
      {
        variant: "success",
      }
    );
    handleConfirmDialogClose();
  };

  const handleButtonClickUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length <= 0) return;
    const files = Array.from(e.target.files).map((file) => file);
    handleFilesUpload(files);
  };

  const handleButtonClickCreateFolder = async () => {
    const folderTitle = prompt("Enter folder name.", "");
    if ([null, undefined, "", " "].includes(folderTitle)) return;
    await FileService.createFolder(folderTitle as string, path);
    setParams({
      ...params,
      page: 1,
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_NAMES.FILES],
    });
  };

  const handleItemClick = (item: FileModel) => {
    console.log("handleItemClick called with:", item);
    console.log("enableSelectedFiles:", enableSelectedFiles);
    console.log("handleSelectFilesChange:", handleSelectFilesChange);
    
    if (item.isFolder) {
      console.log("Item is a folder, navigating");
      handleFolderClick(item._id);
      return;
    }

    if (!enableSelectedFiles || !handleSelectFilesChange) {
      console.log("File selection not enabled or no handler provided");
      return;
    }

    console.log("Processing file selection");
    let _selectFiles = [...selectFiles];

    const findIndex = selectedFiles.findIndex((f) => f._id === item._id);
    if (findIndex < 0) {
      console.log("Adding file to selection");
      _selectFiles = [..._selectFiles, item];
    } else {
      console.log("Removing file from selection");
      _selectFiles.splice(findIndex, 1);
    }

    console.log("Updated selection:", _selectFiles);
    handleSelectFilesChange(_selectFiles);
    setSelectFiles(_selectFiles);
  };

  const handleDelete = async (item: FileModel) => {
    setDeletingId(item._id);
    try {
      await FileService.deleteItem(item._id);
      enqueueSnackbar(`Deleted: ${item.title || item.filename}`, { variant: 'success' });
      setParams({ ...params }); // Refresh
    } catch (e) {
      enqueueSnackbar('Delete failed', { variant: 'error' });
    }
    setDeletingId(null);
  };

  return (
    <Box>
      <Box>
        <Grid container direction="row" justifyContent="flex-start" spacing={1}>
          <Grid item xs={12}>
            <Stack spacing={1} direction="row">
              <Button
                variant="contained"
                size="small"
                component="label"
                disabled={isLoading}
              >
                Upload file
                <input
                  hidden
                  accept="*"
                  multiple
                  type="file"
                  onChange={handleButtonClickUploadFile}
                />
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleButtonClickCreateFolder}
                disabled={isLoading}
              >
                Create folder
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Button
                  variant="text"
                  color="inherit"
                  onClick={() => handleBreadcrumbClick(null)}
                  disabled={isLoading}
                >
                  Root Directory
                </Button>
                {selectFolders.map((folder) => (
                  <Button
                    variant="text"
                    color="inherit"
                    key={folder._id}
                    onClick={() => handleBreadcrumbClick(folder)}
                    disabled={
                      selectFolders[selectFolders.length - 1]._id ===
                        folder._id || isLoading
                    }
                  >
                    {folder.title}
                  </Button>
                ))}
              </Breadcrumbs>
            </Box>
          </Grid>

          {!isLoading ? (
            <Grid item xs={12} sx={{ minHeight: 400 }}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                spacing={1}
                ref={drop as any}
                sx={{ position: "relative", height: "100%" }}
              >
                {dragAndDropActive && (
                  <DragAndDropWrapperStyled>
                    <Typography variant="h6">
                      Drag files here.
                    </Typography>
                  </DragAndDropWrapperStyled>
                )}
                {data.results.map((item: FileModel) => (
                  <Grid item key={item._id}>
                    <Box sx={{ opacity: !dragAndDropActive ? 1 : 0.3 }}>
                      <Tooltip title={item.title} placement="bottom">
                        <ToggleButtonStyled
                          fullWidth
                          size="large"
                          value={item._id}
                          selected={selectFiles.some((s) => s._id === item._id)}
                          onClick={() => handleItemClick(item)}
                          style={{ cursor: "pointer", position: 'relative' }}
                          onContextMenu={(e) => handleContextMenu(e, item)}
                          disabled={isLoading}
                          sx={{
                            border: '2px solid transparent',
                            '&:hover': {
                              border: '2px solid #1976d2',
                              boxShadow: 3,
                            },
                            transition: 'border 0.2s, box-shadow 0.2s',
                          }}
                        >
                          {item.isFolder === true ? (
                            <Fragment>
                              <FolderIcon sx={{ fontSize: 40 }} />
                              <Typography noWrap>{item.title}</Typography>
                            </Fragment>
                          ) : (
                            <FileItemBoxStyled>
                              {isImageFile(item.mimetype) ? (
                                <Image
                                  fill
                                  loading="lazy"
                                  src={generateFileUrl(item)}
                                  alt={item.title}
                                  style={{ objectFit: 'cover', borderRadius: 8, background: '#222' }}
                                />
                              ) : (
                                <Fragment>
                                  <FileBrowserIcon
                                    fileName={item.filename}
                                    fontSize="large"
                                  />
                                </Fragment>
                              )}
                              <Typography noWrap sx={{ mt: 1, fontSize: 12, textAlign: 'center', width: '100%' }}>{item.title || item.filename}</Typography>
                              <IconButton
                                size="small"
                                sx={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.5)' }}
                                onClick={e => { e.stopPropagation(); handleDelete(item); }}
                                disabled={deletingId === item._id}
                              >
                                {deletingId === item._id ? <CircularProgress size={18} /> : <DeleteIcon fontSize="small" htmlColor="#fff" />}
                              </IconButton>
                            </FileItemBoxStyled>
                          )}
                        </ToggleButtonStyled>
                      </Tooltip>
                    </Box>
                  </Grid>
                ))}

                {uploadingFiles.map((item, index) => (
                  <Grid key={index} item>
                    <ToggleButtonStyled
                      fullWidth
                      size="large"
                      value=""
                      style={{ cursor: "pointer" }}
                      disabled={isLoading}
                    >
                      <FileItemBoxStyled>
                        <Fragment>
                          <FileBrowserIcon
                            fileName={item.name}
                            fontSize="large"
                          />
                          <Typography>{item.name}</Typography>

                          {item.waiting && (
                            <Typography variant="caption">
                              Waiting...
                            </Typography>
                          )}
                          {item.uploading && (
                            <Box sx={{ width: "100%", marginTop: "5px" }}>
                              <LinearProgress />
                            </Box>
                          )}
                        </Fragment>
                      </FileItemBoxStyled>
                    </ToggleButtonStyled>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ minHeight: 400 }}>
              <Stack spacing={1} direction="row">
                {[...Array(3)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rounded"
                    width={100}
                    height={100}
                  />
                ))}
              </Stack>
            </Grid>
          )}

          <Menu
            open={contextMenu !== null}
            onClose={handleMenuClose}
            anchorReference="anchorPosition"
            anchorPosition={contextMenu !== null ? contextMenu : undefined}
          >
            <MenuItem disabled={isLoading} onClick={handleClickEditMenuItem}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem
              disabled={isLoading}
              onClick={handleClickDownloadMenuItem}
            >
              <ListItemIcon>
                <DownloadIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Download</ListItemText>
            </MenuItem>
            <MenuItem disabled={isLoading} onClick={handleClickCopyUrlMenuItem}>
              <ListItemIcon>
                <ContentCopyIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy URL</ListItemText>
            </MenuItem>
            <MenuItem disabled={isLoading} onClick={handleClickDeleteMenuItem}>
              <ListItemIcon>
                <DeleteForeverIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </Grid>
      </Box>

      <Box>
        <Pagination
          type="function"
          params={params}
          setParams={setParams}
          loading={loading}
          totalPages={data?.totalPages}
          currentPage={data?.currentPage}
        />
      </Box>
    </Box>
  );
}
