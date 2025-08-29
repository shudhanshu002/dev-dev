abstract class TakePic {
    constructor(
        public cameraMode: string,
        public filter: string
    ){}
}

const hc = new TakePic("test","kks");