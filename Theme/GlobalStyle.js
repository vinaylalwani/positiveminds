import Colors from './Colors';
import Spacer from './SpacerStyle';
import Alignment from './AlignmentStyle';
import {dp} from '../Utilities/css';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  commonContainer:{
    backgroundColor:Colors.white,
    ...Spacer.mediumHorizontalPadding,
    ...Spacer.mediumVerticalPadding,
  },
  // bottom tab
  bottomTabWrap: {
    // backgroundColor: '#018069',
    color: Colors.white,
  },

  //
  mainContainer: {
    ...Alignment.fill,
    ...Alignment.mainCenter,
    backgroundColor: Colors.white,
    ...Alignment.fillCenter,
  },
  mainScrollView: {
    ...Alignment.fillCenter,
    ...Spacer.mediumHorizontalPadding,
  },
  afterScrollView: {
    ...Alignment.fillCenter,
  },
  scrollViewFullHeight: {
    height: '100%',
  },
  // signup | forgot | reset | signin | Verification
  subHeading: {
    color: Colors.ash2,
  },

  // alignment classes
  alignCenter: {
    textAlign: 'center',
  },
  alignRight: {
    textAlign: 'right',
  },
  alignLeft: {
    textAlign: 'left',
  },

  // kit loader
  kitLoaderMedium: {
    fontSize: dp(50),
  },

  // dropdown
  modalWrap: {
    borderWidth: 1,
    borderColor: Colors.input,
    borderRadius: 5,
    height: dp(56),
    // padding:10,
    position: 'relative',
    flex: 1,
    paddingHorizontal: dp(20),
    justifyContent: 'center',
    // alignItems:'center'
    // border
  },
  modalDropdownStyle: {
    width: 'auto',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#dddddd',
    borderBottomWidth: 0,
    shadowColor: '#777777',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  modalDropdownTxtStyle: {
    color: '#000000',
    fontSize: dp(14),
  },
  kitCardLeftHeaderImgWrap: {
    width: 54,
    height: 54,
  },
  // accordion body divider style
  dividerStyle: {backgroundColor: Colors.ash4, height: 2, opacity: 0.5},
  dividerBlueStyle: {backgroundColor: Colors.blue, height: 4},
  accordionItemHorizontalSpacing: {
    paddingHorizontal: '8%',
  },

  // signin singup background
  commonBgSingin: {
    backgroundColor: Colors.commonPageBg,
    flex: 1,
  },
  // data table
  dataTableCell: {
    justifyContent: 'center',
  },
  phoneContainer: { height:50, paddingVertical:0, backgroundColor: 'transparent', width: '100%', borderWidth:1, borderColor: '#d8d8d8', borderRadius:5 },
  phoneInputContainer: { height:50, paddingVertical:0, backgroundColor: 'transparent', borderColor: '#d8d8d8', borderRadius:5 }
});
