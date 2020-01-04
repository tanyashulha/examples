
import React from 'react';
import { connect } from 'react-redux';
import ImportExport from '@material-ui/icons/ImportExport';
import ColorPicker from '../../components/ColorPicker';
import { setPrimaryColor, setSecondaryColor, swapColors } from '../../actions/colors';
 
const Pallete = props => {
  return (
    <React.Fragment>
      <ColorPicker
        color={props.primaryColor}
        onChange={props.handlePrimaryColorChange}
      />
      <ColorPicker
        color={props.secondaryColor}
        onChange={props.handleSecondaryColorChange}
      />
      <span onClick={props.handleSwapColors}>
        <ImportExport />
      </span>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  primaryColor: state.colors.primary,
  secondaryColor: state.colors.secondary
});

const mapDispatchToProps = dispatch => ({
  handlePrimaryColorChange: color => {
    dispatch(setPrimaryColor(color));
  },
  handleSecondaryColorChange: color => {
    dispatch(setSecondaryColor(color));
  },
  handleSwapColors: () => {
    dispatch(swapColors());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Pallete);