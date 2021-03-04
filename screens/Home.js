import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import {
    H1,
    H2,
    H3,
    Spinner,
    Header,
    Left,
    Body
} from 'native-base'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({ navigation }) => {
    const leftButtonConfig = {
        title: 'Gallery',
        handler: () => navigation.replace("Gallery"),
    };
 
    const titleConfig = {
        tintColor :'#ff0096',
        title: 'Home',
    };

    return (
        <View style={styles.container}>
            <Header style={{
                backgroundColor:'rgba(60,190,100,0.4)',
                alignItems: 'center',
                justifyContent:'center'
            }}>
                <StatusBar backgroundColor='#000'/>
                <Left>
                    <TouchableOpacity
                    onPress={()=>navigation.replace('Gallery')}>
                        <H3 style={{
                            color: '#57f'
                        }}>Gallery</H3>
                    </TouchableOpacity>
                </Left>
                <Body>
                    <H1 style={{
                        marginLeft: windowWidth * 0.1,
                        color:'#fff'
                    }}>Home</H1>
                </Body>
            </Header>
            <View style={styles.subContainer}>
                <H1>We are in Home Page</H1>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex:1,
        alignItems: 'center',
        justifyContent:'center'
    }
});


export default Home;