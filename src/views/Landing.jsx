import { motion } from 'framer-motion';
import Logo from '../icons/Logo';
import Logo2 from '../icons/Logo2';

const Landing = ({ logoPosition, onFinish }) => {
  // console.log(logoPosition);
  
  return (
    <div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   transition={{ duration: 1 }}
      style={{background:"black", display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", width:"100%"}}
    >
      <div
        // initial={{ scale: 0, opacity: 0 }}
        // animate={{ scale: 1, opacity: 1 }}
        // transition={{ delay: 1, duration: 1 }}
        // className="transform scale-0"
      >
        <Logo2 logoPosition={logoPosition} onAnimationEnd={onFinish}/>
      </div>
    </div>
  );
};

export default Landing;
