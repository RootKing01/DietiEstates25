import './App.css';
import React, { useState } from 'react';
import { View, Button, TextField, Flex, Heading } from '@aws-amplify/ui-react';
import UserFormPage from "./UserAccess/UserFormPage.jsx";


function App() {

  return (
      <View>
        <UserFormPage></UserFormPage>
        <p>HI, I'm A diV</p>
      </View>
  );
}
export default App;
