import React,{useState,useEffect} from 'react';
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';


import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    Dimensions,
    StatusBar,
    TouchableOpacity
} from 'react-native'

import {
    H1,
    H2,
    H3,
    Spinner,
    Header,
    Left,
    Body
} from 'native-base';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Gallery = ({ navigation }) => {

    const [data, setData] = useState([]);
    const storeData = async (tempData) => {
        try {
        await AsyncStorage.setItem('data', JSON.stringify(tempData))
    } catch (e) {
        alert(e)
    }
    }


    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('data')
            if (value !== null) {
                const td = JSON.parse(value)
                setData(td)
            }
        } catch(e) {
            alert(e)
        }
    }
    
    const api='https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s'
    const fetchdata = async () => {
        await getData()
        try {
            let tempData = await Axios.get(api);
            var t = []
            tempData.data.photos.photo.map((loc) => {
                t.push(loc.url_s)
            })
            setData(t)
            storeData(t)
        } catch (e) {
            Snackbar.show({
                text: 'Please Check Your Network',
                textColor: 'rgba(0,0,0,1)',
                backgroundColor:'rgba(84,212,18,0.65)',
                duration: Snackbar.LENGTH_SHORT,
                });
        }
    }
    useEffect(() => {
        fetchdata()
    },[])

    const images = [
    'https://live.staticflickr.com/65535/50999598098_3dbfe2fd8e_m.jpg',
    'https://live.staticflickr.com/65535/50999598453_f1fb079905_m.jpg',
    'https://live.staticflickr.com/65535/50999599463_ab876511a0_m.jpg',
    'https://live.staticflickr.com/65535/50999601923_f0cd0e3a76_m.jpg'
];


    return (
        <ScrollView style={styles.container}>
            <Header style={{
                backgroundColor:'rgba(60,190,100,0.4)',
                alignItems: 'center',
                justifyContent:'center'
            }}>
                <StatusBar backgroundColor='#000'/>
                <Left>
                    <TouchableOpacity
                    onPress={()=>navigation.replace('Home')}>
                        <H3 style={{
                            color: '#57f'
                        }}>Home</H3>
                    </TouchableOpacity>
                </Left>
                <Body>
                    <H1 style={{
                        marginLeft: windowWidth * 0.09,
                        color:'#fff'
                    }}>Gallery</H1>
                </Body>
            </Header>
            {data.length>1?<View style={styles.subContainer}>
                    {data.map((loc, index) => {
                        () => { console.log(images[index]) }
                        return (
                            <View key={index} style={styles.box}>
                                <Image source={{ uri: loc }} style={styles.img} />
                            </View>
                        )
                    })}
            </View> : <Spinner color='#f55' style={{marginTop:windowHeight*0.4}}/>}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    nav: {
        backgroundColor:'rgba(60,190,100,0.4)'
    },
    container: {
        flex: 1,
        backgroundColor:'rgba(66,198,190,0.2)'
    },
    subContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingHorizontal: windowWidth * 0.021,
        paddingVertical: windowHeight * 0.018,
        justifyContent: 'space-around',

        
    },
    img: {
        height: windowHeight * 0.2,
        width: windowWidth * 0.45,
        borderRadius:12
    },
    box: {
        alignItems: 'center',
        justifyContent: 'center',
        height: windowHeight * 0.205,
        width: windowWidth * 0.46,
        borderRadius: 12,
        elevation: 5, 
        marginVertical: windowHeight * 0.003,
        
    }
});


export default Gallery;