import React , { useEffect, useState , useCallback}from 'react';
import logo from './logo.svg';
export const Registro =  (props) =>{
    const [isLoading,isLoadingState] = useState(true);
    const token =props.location.search.substr(6);
    const [isUser,isUserState] = useState(null);
    
    
    const getTokenAccess = useCallback( async () =>{
        const uri =`${process.env.REACT_APP_URL}/Registro`
        const data = await fetch(` https://graph.facebook.com/oauth/access_token?client_id=${process.env.REACT_APP_API_KEY}&client_secret=${process.env.REACT_APP_API_SECRET_KEY}&code=${token}&redirect_uri=${uri}`)
        const tokenAccess = await data.json();
        return tokenAccess;
    },[token])
  

    // const getUserId = useCallback( async () => {
    //     const tokenAccess = await getTokenAccess();
    //     isAccessTokenState(tokenAccess.access_token);
    //     let data = await fetch(`https://graph.facebook.com/debug_token?input_token=${token.split("&")[0]}&access_token=${tokenAccess.access_token}`)
        
    //     let infoToken = await data.json();
    //     return infoToken.data.user_id;
    // },[getTokenAccess, token])
    
    // const getUserInfo = useCallback( async (userId) =>{
    //     // https://graph.facebook.com/6109562085784018?fields=name,gender,first_name,last_name&access_token=582967126060996|uJ4wW2_cBNBaL5DlC9bkdbbqtvg
    //     let userInfo = await fetch(`https://graph.facebook.com/${userId}?fields=email,name,gender,first_name,last_name&access_token=${accessToken}`)
    //     let infoUser = await userInfo.json();
    //     isUserState(infoUser);
    //     return infoUser;
    // },[accessToken])

    const getUserInfo =  async (token) =>{
        let data = await fetch(`https://graph.facebook.com/me?fields=email,name&access_token=${token.access_token}`)
        let info = await data.json();
        isUserState(info);
        isLoadingState(false);
        return info;
    }

    const getUserInfoAccess = useCallback (async () =>{
        let infoToken = await getTokenAccess();
        let userInfo = await getUserInfo(infoToken);
        return userInfo;
    },[getTokenAccess]);

    const fetchData = useCallback(async  () =>{
       await getUserInfoAccess();
        // let infoUser = await getUserInfo(userId);
    },[getUserInfoAccess])
    
    useEffect(() => {
        fetchData()
    }, [fetchData]);
    
   


    if(isLoading){
        return (
            <div className="App">
                <h1>Cargando..</h1>
            </div>
        )
    }else{
        console.log(isUser);
        return (
            <div className="App">
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <h1 style={{margin:0}}>Registro y Logueado</h1>
                <h4 style={{margin:0}}>Tus Datos </h4>
                <h3 style={{margin:0}}>Tu ID : {isUser.id}</h3>
                <h5 style={{margin:0}}>Nombres y Apellidos: {isUser.name} </h5>
                <h5 style={{margin:0}}>Tu Correo es: {isUser.email} </h5>

                </header>
            </div>
        )
    }
}

export default Registro