import './App.css';
import {Container, ThemeProvider} from "@mui/material";
import {useEffect, useState} from "react";
import {theme} from "./styles/theme";
import {Appbar} from "./components/appbar";
import {Banner} from "./components/banner";
import {Promotions} from "./components/promotions";
import {Products} from "./components/products";
import {Footer} from "./components/footer";
import {AppDrawer} from "./components/appdrawer";
import {UIProvider} from "./context/ui";
import {SearchContext} from "./context/SearchContext"
import {ItemContext} from "./context/ItemsContext"
import {BasketList} from "./components/basketlist";
import {BasketContext} from "./context/BasketContext";
import {AdminTable} from "./components/adminpanel/AdminPanel";
import {AdminContext} from "./context/AdminContext";
import {AddForm} from "./components/adminpanel/AddForm";
import {UpdateForm} from "./components/adminpanel/UpdateForm";
import {Route, Routes} from "react-router-dom";
import {OrderChecker} from "./components/adminpanel/orderlist/OrderTable";
import {RefContext} from "./context/RefContext";


export const App = () => {

  useEffect(()=>{
    document.title='Br00wser shop'
  }, [])

    const [search, setSearch] = useState('%');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(999999);
    const [category, setCategory] = useState('');
    const [items, setItems] = useState([]);
    const [basketOpen, setBasketOpen] = useState(false);
    const [adminLogged, setAdminLogged] = useState(false);
    const [openAddUserPanel, setOpenAddUserPanel] = useState(false);
    const [openOrderPanel, setOpenOrderPanel] = useState(false);
    const [gridRef, setGridRef] = useState(null);
    const [contactRef, setContactRef] = useState(null);

  return (
      <ThemeProvider theme={theme}>
      <Container
      maxWidth="x1"
      sx={{
        background:'#fff'
      }}> <RefContext.Provider value={{gridRef, setGridRef, contactRef, setContactRef}}>
          <AdminContext.Provider value={{adminLogged, setAdminLogged, openAddUserPanel, setOpenAddUserPanel, openOrderPanel, setOpenOrderPanel}}>
          <BasketContext.Provider value={{basketOpen, setBasketOpen}}>
          <ItemContext.Provider value={{items, setItems}}>
          <SearchContext.Provider value={{search, setSearch, minPrice,setMinPrice,maxPrice, setMaxPrice, category, setCategory}}>
          <UIProvider>
              <Appbar/>
              <Banner/>
              <Promotions/>
              <Products/>
              <BasketList/>
              <AdminTable/>
              <AddForm/>
              <Routes>
                  <Route path="/update/:uuid" element={<UpdateForm/>}/>
              </Routes>
              <OrderChecker/>
              <AppDrawer/>
              <Footer/>
      </UIProvider>
      </SearchContext.Provider>
      </ItemContext.Provider>
      </BasketContext.Provider>
      </AdminContext.Provider>
      </RefContext.Provider>
      </Container>
      </ThemeProvider>



  );
}

// export default App;
