import './App.css';
import React, { useState } from 'react';
import { View, Button, TextField, Flex, Heading } from '@aws-amplify/ui-react';
import UserCreateForm from "./ui-components/UserCreateForm.jsx";
import { DataStore } from 'aws-amplify/datastore';
import { User } from './models';


function App() {

  return (
      <View>
        <UserCreateForm></UserCreateForm>
        <p>HI, I'm A diV</p>
      </View>
  );
}
export default App;
