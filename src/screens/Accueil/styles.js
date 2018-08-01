import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    container:{
        flexGrow:1,
        maxHeight:'100%'
    },
    content:{
        paddingHorizontal:10,
        paddingVertical:40
    },
    footerContainer:{
        flexGrow:1,
        maxHeight:'100%',
        alignContent:'flex-end',
        justifyContent:'flex-end',
    },
    item:{
        color:'#353535',
        marginBottom:10,
        fontSize:18
    },
    buttonContainer:{
        alignItems:'center',
        marginTop:40,
        marginBottom:20,
    },
    button:{
        width:200,
        borderColor:'#027691',
        borderWidth:2,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
    },
    buttonText:{
        fontWeight:'bold',
        fontSize:18,
        color:'#027691',
    },
    spinnerContainer:{
        alignItems:'center',
        marginTop:140,
    },
});