import { connect } from "react-redux";
import Frames from '../../components/Frames/';
import { addFrame, setActiveFrame, cloneFrame, deleteFrame } from '../../actions/frames';

const mapStateToProps = state => ({
  frames: state.frames
});

const mapDispatchToProps = dispatch => ({
  addFrame: () => {
    dispatch(addFrame())
  },
  setActiveFrame: (e, index) => {
    if (e.target.tagName === 'DIV') {
      dispatch(setActiveFrame(index))
    }
  },
  cloneFrame: index => {
    dispatch(cloneFrame(index));
  },
  deleteFrame: index => {
    dispatch(deleteFrame(index));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Frames);