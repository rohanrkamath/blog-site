"use client";

// ** next
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import Box from "@mui/material/Box";

// ** mui
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { SvgIconProps } from "@mui/material/SvgIcon";

// ** icons
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import LinkIcon from "@mui/icons-material/Link";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import CodeIcon from "@mui/icons-material/Code";
import DataObjectIcon from "@mui/icons-material/DataObject";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import ImageIcon from "@mui/icons-material/Image";

// ** third party
import * as commands from "@uiw/react-md-editor/commands";
import ImageCommandComponent from "./commands/ImageCommand";

const Icon = ({ name, ...props }: { name?: string } & SvgIconProps) => {
  switch (name) {
    case commands.bold.name:
      return <FormatBoldIcon {...props} />;
    case commands.italic.name:
      return <FormatItalicIcon {...props} />;
    case commands.strikethrough.name:
      return <FormatStrikethroughIcon {...props} />;
    case "underline":
      return <FormatUnderlinedIcon {...props} />;
    case commands.hr.name:
      return <HorizontalRuleIcon {...props} />;
    case commands.link.name:
      return <LinkIcon {...props} />;
    case commands.quote.name:
      return <FormatQuoteIcon {...props} />;
    case commands.code.name:
      return <CodeIcon {...props} />;
    case commands.codeBlock.name:
      return <DataObjectIcon {...props} />;
    case commands.codeBlock.name:
      return <DataObjectIcon {...props} />;
    case commands.orderedListCommand.name:
      return <FormatListNumberedIcon {...props} />;
    case commands.unorderedListCommand.name:
      return <FormatListBulletedIcon {...props} />;
    case commands.checkedListCommand.name:
      return <ChecklistIcon {...props} />;
    case commands.fullscreen.name:
      return <FullscreenIcon {...props} />;
    case commands.codeEdit.name:
      return <VerticalSplitIcon {...props} />;
    case commands.codePreview.name:
      return (
        <VerticalSplitIcon {...props} sx={{ transform: "rotate(-180deg)" }} />
      );
    case commands.codeLive.name:
      return <SplitscreenIcon {...props} sx={{ transform: "rotate(90deg)" }} />;

    case "image":
      return <ImageIcon {...props} />;

    default:
      return <></>;
  }
};

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), { ssr: false });

type EditorProps = {
  value: string;
  setValue: (text: string) => void;
};

export default function Editor({ value, setValue }: EditorProps) {
  return (
    <MDEditor 
      value={value} 
      onChange={(val) => setValue(val || "")} 
      height={800}
      commands={[
        ...commands.getCommands(),
        {
          name: "image",
          keyCommand: "image",
          buttonProps: { "aria-label": "Add image" },
          icon: <ImageCommandComponent index={0} disabled={false} executeCommand={() => {}} command={{ name: "image", keyCommand: "image" }} />,
        },
      ]}
    />
  );
}
