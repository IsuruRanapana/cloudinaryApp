import { View, Text } from "react-native";
import styles from "./Home.styles";
import { Button } from "../../components";
import * as ImagePicker from "expo-image-picker";

export default function Home({ navigation }) {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [statusGal, requestPermissionGal] =
    ImagePicker.useMediaLibraryPermissions();

  handleOnPress = () => {};
  handleGalleryPress = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `imgtest/${data.uri.split(".")[1]}`,
          name: `imgtext.${data.uri.split(".")[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
    }
  };
  handleCameraPress = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `imgtest/${data.uri.split(".")[1]}`,
          name: `imgtext.${data.uri.split(".")[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "practiceApp");
    data.append("cloud_name", "dzxduud8j");
    data.append("api_key", "473188795739314");

    fetch("https://api.cloudinary.com/v1_1/dzxduu8j/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <View style={styles.container}>
      <Button labelText={"Upload Photo"} onPress={handleOnPress} />
      <Button labelText={"Gallery"} onPress={handleGalleryPress} />
      <Button labelText={"Camera"} onPress={handleCameraPress} />
    </View>
  );
}
