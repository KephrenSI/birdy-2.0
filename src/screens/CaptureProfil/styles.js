import {StyleSheet, Image} from 'react-native';


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
    key:{
        color:'#353535',
        fontSize:20,
        fontWeight:'bold'
    },
    repartition:{
        color:'#353535',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    },
    item:{
        color:'#353535',
        marginBottom:15,
        fontSize:18
    },
    buttonContainer:{
        alignItems:'center',
        marginTop:40,
        marginBottom:20,
    },
    spinnerContainer:{
        alignItems:'center',
        marginTop:140,
    },
    image:{
        width: '100%',
        height: '100%',
        marginBottom:15,
        // resizeMode: Image.resizeMode.contain,
        marginLeft:'auto',
        marginRight:'auto',
    },
    map:{
        width: '100%',
        height: '100%' ,
        // resizeMode: Image.resizeMode.contain,
        marginBottom:15,
        marginTop:3,
        marginLeft:'auto',
        marginRight:'auto',
    },
    imgContainer:{
        width:'80%',
        maxHeight:200,
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:15
    }
});
