
import { RNS3 } from 'react-native-aws3';

export default function putPhotoPath(pathPhoto, cb) {


    let randString = Math.floor(Math.random() * 1000) + 1

    let file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: pathPhoto.uri,
        name: `${Date.now().toString()}${randString.toString()}.png`,
        type: "image/png"
    }

    let options = {
        bucket: "dharmadi93",
        region: "ap-southeast-1",
        accessKey: "AKIAJGBPZSPES6UGVS6Q",
        secretKey: "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",
        successActionStatus: 201
    }

    RNS3.put(file, options).then(response => {
        if (response.status !== 201)
            throw new Error("Failed to upload image to S3");

        cb(response.body)
        /**
         * {
   *   postResponse: {
   *     bucket: "your-bucket",
   *     etag : "9f620878e06d28774406017480a59fd4",
   *     key: "uploads/image.png",
   *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
   *   }
   * }
         */
    });
}