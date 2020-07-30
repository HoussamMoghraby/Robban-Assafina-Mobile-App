import React from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions, Image, Linking } from 'react-native';
import TouchableComponent from './TouchableComponent';
import MyText from './MyText';
var IMAGE_DIMENSION = Dimensions.get('window').width / 2;

const getImageStyle = (currentStyle, tag) => {
	let style = currentStyle;
	switch (tag) {
		case "golden-1":
			style = `${currentStyle}Golden1`;
			break;
		case "golden-2":
			style = `${currentStyle}Golden2`;
			break;
		default:
			break;
	}
	return style;
};

const SponsorsList = (props) => {
	return (
		// <ScrollView style={{ width: '100%' }}>
		<View style={styles.list} key="sponsors">
			{
				props.images.map(image => {
					return (
						<View key={image.title} style={styles[getImageStyle('imageContainer', image.tag)]}>
							<TouchableComponent onPress={() => { Linking.openURL(image.link) }}>
								<View>
									{
										image.tag == 'golden-1' ?
											<View style={styles.goldenSponsor}>
												<MyText style={styles.goldenSponsorText} bold={true}>Golden Sponsor</MyText>
											</View>
											: <View></View>
									}
									<View>
										<Image source={{ uri: image.imageUrl }} style={styles[getImageStyle('image', image.tag)]}></Image>
									</View>
								</View>
							</TouchableComponent>
						</View>
					)
				})
			}
			{/* <HTML
                renderers={{
                    a: (e) => {
                        <View><Text>123</Text></View>
                    }
                }}
                html={sponsorsHtml}
                imagesMaxWidth={Dimensions.get('window').width}
            ></HTML> */}
			{/* <WebView injectedJavaScript={`alert(jQuery('#wp-bannerize-widget-2').find('img')[0].title)`} source={{uri:'https://assafinaonline.com/about-us/'}}></WebView> */}
		</View>
		// </ScrollView >
	)

}

const styles = StyleSheet.create({
	list: {
		flex: 1,
		backgroundColor: '#fff',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	imageContainer: {
		maxWidth: '50%',
		marginVertical: 5,
		borderColor: '#eee',
		borderWidth: 1,
		height: IMAGE_DIMENSION,
		maxHeight: 150,
	},
	image: {
		width: IMAGE_DIMENSION,
		maxWidth: 165,
		height: '100%'
	},
	imageContainerGolden1: {
		//width: '100%',
		width: '100%',
		marginVertical: 5,
		alignItems: 'center'
	},
	imageGolden1: {
		width: 190,
		height: 165,
		borderColor: '#f6c501',
		borderWidth: 1
	},
	goldenSponsor: {
		backgroundColor: '#f6c501',
		alignItems: 'center'
	},
	goldenSponsorText: {
		color: '#fff',
		fontSize: 16
	},
	imageContainerGolden2: {
		//width: '100%',
		width: '100%',
		marginVertical: 5,
		alignItems: 'center'
	},
	imageGolden2: {
		width: 190,
		height: 300,
		borderColor: '#f6c501',
		borderWidth: 1
	},
});


export default SponsorsList;