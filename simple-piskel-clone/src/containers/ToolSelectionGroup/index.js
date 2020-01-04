import React from 'react';
import { connect } from "react-redux";
import Tools from '../../components/Tools';
import Create from '@material-ui/icons/Create';
import BorderColor from '@material-ui/icons/BorderColor';
import Crop169Icon from '@material-ui/icons/Crop169';
import FormatColorFill from '@material-ui/icons/FormatColorFill';
import { setActiveTool } from "../../actions/tools";

const tools = [
  {
    title: "Pen",
    value: "pencil",
    icon: <Create />
  },
  {
    title: "Paint Bucket",
    value: "fill",
    icon: <FormatColorFill />
  },
  {
    title: "Eraser",
    value: "rubber",
    icon: <Crop169Icon />
  },
  {
    title: "Stroke",
    value: "stroke",
    icon: <BorderColor />
  }
];

const mapStateToProps = state => ({
  activeTool: state.activeTool
});

const mapDispatchToProps = dispatch => ({
  handleToolChange: tool => {
      dispatch(setActiveTool(tool));
  }
});

function ToolSelectionGroup(props) {
  return <Tools {...props} tools={tools} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolSelectionGroup);
