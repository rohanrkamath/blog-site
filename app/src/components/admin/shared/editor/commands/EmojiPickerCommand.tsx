"use client";

// ** react
import { Fragment, useState, MouseEvent } from "react";

// ** third party
import EmojiPicker, {
  EmojiClickData,
  Theme,
  Categories,
} from "emoji-picker-react";

// ** mui
import { useTheme } from "@mui/material/styles";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";

// ** icons
import AddReactionIcon from "@mui/icons-material/AddReaction";

// ** third party
import { ICommand } from "@uiw/react-md-editor/commands";

// ** models
import EditorBaseCommandProps from "@/components/admin/shared/editor/commands/type";

export const emojiPickerCommand: ICommand = {
  name: "emojiPicker",
  keyCommand: "emojiPicker",
};

export default function EmojiPickerComponent({
  index,
  disabled,
  executeCommand,
}: EditorBaseCommandProps) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? `${emojiPickerCommand.name}-popover` : undefined;

  const handlePopoverOpenClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handlePopoverClose = () => setAnchorEl(null);

  const onClick = (data: EmojiClickData) => {
    executeCommand({
      name: "emoji",
      keyCommand: "emoji",
      execute: (state, api) => {
        api.replaceSelection(data.emoji);
      },
    });
    handlePopoverClose();
  };

  return (
    <Fragment>
      <IconButton
        disabled={disabled}
        size="small"
        onClick={handlePopoverOpenClick}
        key={index}
        tabIndex={index}
      >
        <AddReactionIcon fontSize="small" />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        sx={{ zIndex: 99999 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <EmojiPicker
          categories={[
            {
              category: Categories.SUGGESTED,
              name: "Recently Used",
            },
            {
              category: Categories.SMILEYS_PEOPLE,
              name: "Smileys & People",
            },
            {
              category: Categories.ANIMALS_NATURE,
              name: "Animals & Nature",
            },
            {
              category: Categories.FOOD_DRINK,
              name: "Food & Drink",
            },
            {
              category: Categories.TRAVEL_PLACES,
              name: "Travel & Places",
            },
            {
              category: Categories.ACTIVITIES,
              name: "Activities",
            },
            {
              category: Categories.OBJECTS,
              name: "Objects",
            },
            {
              category: Categories.SYMBOLS,
              name: "Symbols",
            },
            {
              category: Categories.FLAGS,
              name: "Flags",
            },
          ]}
          theme={theme.palette.mode === "dark" ? Theme.DARK : Theme.LIGHT}
          onEmojiClick={onClick}
          lazyLoadEmojis
          searchPlaceHolder="Search emoji..."
          previewConfig={{
            defaultCaption: "How's your mood? :)",
          }}
        />
      </Popover>
    </Fragment>
  );
}
