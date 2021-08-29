import React , { useEffect, useState , useCallback}from 'react';
import logo from './logo.svg';
export const Registro =  (props) =>{
    const [isLoading,isLoadingState] = useState(true);
    const [token,tokenState] = useState(props.location.hash.substr(14));
    const [accessToken,isAccessTokenState] = useState("")
    const [isUser,isUserState] = useState({});
    
    const getUserId = useCallback( async () => {
        const tokenAccess = await getTokenAccess();
        isAccessTokenState(tokenAccess.access_token);
        let data = await fetch(`https://graph.facebook.com/debug_token?input_token=${token.split("&")[0]}&access_token=${tokenAccess.access_token}`)
        let infoToken = await data.json();
        return infoToken.data.user_id;
    },[token])
    
    const getUserInfo = useCallback( async (userId) =>{
        // https://graph.facebook.com/6109562085784018?fields=name,gender,first_name,last_name&access_token=582967126060996|uJ4wW2_cBNBaL5DlC9bkdbbqtvg
        let userInfo = await fetch(`https://graph.facebook.com/${userId}?fields=email,name,gender,first_name,last_name&access_token=${accessToken}`)
        let infoUser = await userInfo.json();
        isUserState(infoUser);
        return infoUser;
    },[accessToken])

    const fetchData = useCallback(async  () =>{
        let userId = await getUserId()
        let infoUser = await getUserInfo(userId);
        isUserState(infoUser);
        isLoadingState(false)
        console.log(infoUser);
    },[getUserId, getUserInfo])
    
    useEffect(() => {
        fetchData()
    }, [fetchData]);
    
   

    const getTokenAccess =  async () =>{
        const data = await fetch(` https://graph.facebook.com/oauth/access_token?client_id=${process.env.REACT_APP_API_KEY}&client_secret=${process.env.REACT_APP_API_SECRET_KEY}&grant_type=client_credentials`)
        const tokenAccess = await data.json();
        return tokenAccess;
    }
  

    if(isLoading){
        return (
            <div className="App">
                <header className="App-header"></header>
                <h5>Cargando..</h5>
            </div>
        )
    }
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
            <h1>Registro y Loguead</h1>
            <h4>Tus Datos </h4>
            <h3 style={{margin:0}}>Tu ID: {isUser.id}</h3>
            <h5>Nombres y Apellidos: {isUser.name}</h5>
            </header>
        </div>
    )
}

export default Registro