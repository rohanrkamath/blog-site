"use client";

// ** react
import { Fragment, useState, MouseEvent } from "react";

// ** mui
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

// ** icons
import ImageIcon from "@mui/icons-material/Image";

// ** third party
import * as commands from "@uiw/react-md-editor/commands";
import { ICommand } from "@uiw/react-md-editor/commands";

// ** components
import DialogFileBrowser from "@/components/admin/shared/file-browser/DialogFileBrowser";

// ** models
import EditorBaseCommandProps from "@/components/admin/shared/editor/commands/type";
import FileModel from "@/models/FileModel";

// ** utils
import generateFileUrl from "@/utils/GenerateFileUrl";

export const imageCommand: ICommand = {
  name: "image",
  keyCommand: "image",
};

export default function ImageCommandComponent({
  index,
  disabled,
  executeCommand,
}: EditorBaseCommandProps) {
  const [imageBrowserOpen, setImageBrowserOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectImages, setSelectImages] = useState(new Array<FileModel>());

  const open = Boolean(anchorEl);
  const id = open ? `${imageCommand.name}-popover` : undefined;

  const selectImagesConfirm = () => {
    console.log("selectImagesConfirm called with:", selectImages);
    if (!selectImages || selectImages.length <= 0) {
      console.log("No images selected, closing dialog");
      setImageBrowserOpen(false);
      return;
    }

    console.log("Executing customImage command with images:", selectImages);
    executeCommand({
      name: "customImage",
      keyCommand: "customImage",
      execute: (state, api) => {
        console.log("customImage execute function called");
        const markdown = selectImages.map(
          (item) => `![${item.title || item.filename}](${generateFileUrl(item)})`
        );
        console.log("Generated markdown:", markdown);
        api.replaceSelection(markdown.join("\n"));
      },
    });
    setSelectImages([]);
    setImageBrowserOpen(false);
  };

  const handlePopoverOpenClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log("Image button clicked");
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    console.log("Popover closed");
    setAnchorEl(null);
  };

  const handleClickCommand = (command: ICommand) => {
    console.log("handleClickCommand called with:", command);
    executeCommand(command);
    handlePopoverClose();
  };

  const handleSelectImage = () => {
    console.log("handleSelectImage called - opening file browser");
    handlePopoverClose();
    setImageBrowserOpen(true);
  };

  const handleSelectImageChange = (data: FileModel[]) => {
    console.log("handleSelectImageChange called with:", data);
    setSelectImages(data);
  };

  return (
    <Fragment>
      <IconButton
        disabled={disabled}
        size="small"
        onClick={handlePopoverOpenClick}
        key={index}
        tabIndex={index}
        sx={{ zIndex: 99999 }}
      >
        <ImageIcon fontSize="small" />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List dense disablePadding>
          <ListItem disablePadding>
            <ListItemButton onClick={handleSelectImage}>
              <ListItemText primary={"Select Image"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClickCommand(commands.image)}>
              <ListItemText primary={"Image Link"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>

      <DialogFileBrowser
        enableSelectedFiles
        open={imageBrowserOpen}
        setOpen={setImageBrowserOpen}
        selectedFiles={selectImages}
        handleSelectFilesChange={handleSelectImageChange}
        handleConfirmFunction={selectImagesConfirm}
      />
    </Fragment>
  );
}
