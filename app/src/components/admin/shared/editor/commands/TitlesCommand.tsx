"use client";

// ** react
import { Fragment, useState, MouseEvent } from "react";

// ** mui
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// ** icons
import TitleIcon from "@mui/icons-material/Title";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks5Icon from "@mui/icons-material/Looks5";
import Looks6Icon from "@mui/icons-material/Looks6";

// ** third party
import * as commands from "@uiw/react-md-editor/commands";
import { ICommand } from "@uiw/react-md-editor/commands";

// ** models
import EditorBaseCommandProps from "@/components/admin/shared/editor/commands/type";

export const titlesCommand: ICommand = {
  name: "titles",
  keyCommand: "titles",
};

export default function TitlesCommandComponent({
  index,
  disabled,
  executeCommand,
}: EditorBaseCommandProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "titles-popover" : undefined;

  const handlePopoverOpenClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handlePopoverClose = () => setAnchorEl(null);

  const handleClickCommand = (command: ICommand) => {
    executeCommand(command);
    handlePopoverClose();
  };

  const commandItems = [
    {
      name: "h1",
      title: "Heading 1",
      icon: <LooksOneIcon />,
    },
    {
      name: "h2",
      title: "Heading 2",
      icon: <LooksTwoIcon />,
    },
    {
      name: "h3",
      title: "Heading 3",
      icon: <Looks3Icon />,
    },
    {
      name: "h4",
      title: "Heading 4",
      icon: <Looks4Icon />,
    },
    {
      name: "h5",
      title: "Heading 5",
      icon: <Looks5Icon />,
    },
    {
      name: "h6",
      title: "Heading 6",
      icon: <Looks6Icon />,
    },
  ];

  return (
    <Fragment>
      <IconButton
        disabled={disabled}
        size="small"
        onClick={handlePopoverOpenClick}
        key={index}
        tabIndex={index}
      >
        <TitleIcon fontSize="small" />
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
        sx={{ zIndex: 99999 }}
      >
        <List dense disablePadding>
          {commandItems.map((commandItem, commandItemIndex) => (
            <ListItem key={commandItemIndex} disablePadding>
              <ListItemButton
                onClick={() => {
                  const cmd = commands[commandItem.name as keyof typeof commands];
                  if (typeof cmd === "object" && cmd !== null && "execute" in cmd) {
                    handleClickCommand(cmd as ICommand);
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <TextFieldsIcon />
                </ListItemIcon>
                <ListItemText primary={commandItem.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Fragment>
  );
}
