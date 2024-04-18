import { CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";
const Loader = ({ loading }: { loading: boolean }) => {
    const override: CSSProperties = {
        position: 'fixed',
        top: '30%',
        left: '50%'
    };

    return <RingLoader color="#8a74eb" loading={loading} cssOverride={override} size={150} />

}

export default Loader;