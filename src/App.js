import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { View, Button, TextField, Flex, Heading } from '@aws-amplify/ui-react';
import { signIn } from 'aws-amplify/auth';
import { signOut } from 'aws-amplify/auth';
import { signUp } from 'aws-amplify/auth';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await handleSignIn({ username, password });
      if (result?.isSignedIn) {
        alert('Login successful!');
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    try {
      await handleSignUp({ username, password, email, phone_number: phoneNumber });
      alert('Registration successful!');
      setIsSignUp(false);
    } catch (error) {
      alert('Registration failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      as="div"
      backgroundColor="var(--amplify-colors-white)"
      padding="2rem"
      maxWidth="400px"
      margin="2rem auto"
      borderRadius="8px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
    >
      <Heading level={2} marginBottom="1rem">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </Heading>
      
      <Flex as="form" direction="column" gap="1rem" onSubmit={isSignUp ? handleRegister : handleLogin}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {isSignUp && (
          <>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <TextField
              label="Phone Number (optional)"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
            />
          </>
        )}
        
        <Button
          type="submit"
          variation="primary"
          loadingText="Processing..."
          isLoading={isLoading}
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
        
        <Button
          type="button"
          variation="link"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </Button>
        
        <Button
          type="button"
          variation="default"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Flex>
    </View>
  );
}

async function handleSignIn({ username, password }) {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    console.log('Sign in successful:', { isSignedIn, nextStep });
    return { isSignedIn, nextStep };
  } catch (error) {
    console.log('error signing in', error);
  }
}

async function handleSignUp({ username, password, email, phone_number }) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
          phone_number // E.164 number convention
        },
        // optional
        autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      }
    });

    console.log(userId);
  } catch (error) {
    console.log('error signing up:', error);
  }
}


async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}
export default App;
