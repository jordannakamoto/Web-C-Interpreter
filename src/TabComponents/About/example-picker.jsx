'use client'

import {React, useState} from 'react'

import styled from 'styled-components';
import { useProgramOutput } from '@/contexts/ProgramOutputContext';

// Define a styled button with hover effect
const StyledButton = styled.button`
  background-color: #c2fbd7;
  border-radius: 10px;
  margin: 10px;
  box-shadow: rgba(44, 187, 99, .2) 0 -12px 9px -7px inset, rgba(44, 187, 99, .15) 0 1px 2px, rgba(44, 187, 99, .15) 0 2px 4px, rgba(44, 187, 99, .15) 0 4px 8px, rgba(44, 187, 99, .15) 0 4px 8px, rgba(44, 187, 99, .15) 0 8px 16px;
  color: green;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    box-shadow: rgba(44, 187, 99, .35) 0 -12px 9px -7px inset, rgba(44, 187, 99, .25) 0 1px 2px, rgba(44, 187, 99, .25) 0 2px 4px, rgba(44, 187, 99, .25) 0 4px 8px, rgba(44, 187, 99, .25) 0 4px 8px, rgba(44, 187, 99, .25) 0 8px 16px;
    transform: scale(1.05) rotate(-1deg);
  }

  filter: ${props => props.filter};
`;




function ExamplePicker() {
    const { setProgramInput, programInput } = useProgramOutput(); // Context Provider : contexts/ProgramOutputContext.js

    const handleClick = (exampleType) => {
        if(exampleType == 'type'){
            setProgramInput(`
// ***************************************************
// * CS460: Programming Assignment 3: Test Program 7 *
// ***************************************************
procedure main (void)
{
  char char; // should produce an error
}
`)
       }
        else if(exampleType == 'sum'){
            setProgramInput(`
// ***************************************************
// * CS460: Programming Assignment 6: Test Program 1 *
// ***************************************************

function int sum_of_first_n_squares (int n)
{
  int sum;

  sum = 0;
  if (n >= 1)
  {
    sum = n * (n + 1) * (2 * n + 1) / 6;
  }
  return sum;
}
  
procedure main (void)
{
  int n;
  int sum;

  n = 100;
  sum = sum_of_first_n_squares (n);
  printf ("sum of the squares of the first %d numbers = %d\\n", n, sum);
}
`);
        }
        else if(exampleType == 'hex'){
            setProgramInput(`
// ***************************************************
// * CS460: Programming Assignment 6: Test Program 2 *
// ***************************************************

// **********************************************************************
// * Hex digit converts a single character into its integer equivalent. *
// *                                                                    *
// * Hex digit returns -1 upon error                                    *
// **********************************************************************
function int hexdigit2int (char hex_digit)
{
    int i, digit;

    digit = -1;
    if ((hex_digit >= '0') && (hex_digit <= '9'))
    {
    digit = hex_digit - '0';
    }
    else
    {
        if ((hex_digit >= 'a') && (hex_digit <= 'f'))
        {
            digit = hex_digit - 'a' + 10;
        }
        else
        {
            if ((hex_digit >= 'A') && (hex_digit <= 'F'))
            {
            digit = hex_digit - 'A' + 10; 
            }
        }
    }
    return digit;
}



procedure main (void)
{
    char hexnum[9];
    int i, digit, number; 

    number = 0;
    hexnum = "feed\\x0";
    digit = 0;
    for (i = 0; (i < 4) && (digit > -1); i = i + 1)
    {
    digit = hexdigit2int (hexnum[i]);
    if (digit > -1)
    {
        number = number * 16 + digit;
    }
    }
    if (digit > -1)
    {
    printf ("Hex: 0x%s is %d decimal\\n", hexnum, number);
    }
}        `)}
    else if(exampleType == 'fizz'){
setProgramInput(`
// ***************************************************
// * CS460: Programming Assignment 5: Test Program 3 *
// ***************************************************

// *********************************************************************************
// * The fizzbuzz procedure outputs one of the following responses:                *
// *                                                                               *
// * If counter is divisible by three without remainder, display "Fizz".           *
// * If counter is divisible by five without remainder, display "Buzz".            *                
// * If counter is divisible by both 3 and 5 w/out a remainder, display "Fizzbuzz".*
// * If counter is NOT divisible by three or five, display the counter.            *
// *********************************************************************************
procedure fizzbuzz (int counter)
{
  int state;

  state = 0;
  if ((counter % 3) == 0)
  {
    state = 1;
  }
  if ((counter % 5) == 0)
  {
    state = state * 2 + 2;
  }
  if (state == 1)
  {
    printf ("Fizz");
  }
  else
  {
    if (state == 2)
    {
      printf ("Buzz");
    }
    else
    {
      if (state == 4)
      {
        printf ("Fizzbuzz");
      }
      else
      {
        printf ("%d", counter);
      }
    }
  }
}


procedure main (void)
{
  int counter;

  counter = 1;
  while (counter <= 100)
  {
    fizzbuzz (counter);
    counter = counter + 1;
    if (counter <= 100)
    {
      printf (", ");
    }
    else
    {
      printf ("\\n");
    }
  }
}
`)

    }

// End handle click
    };

    return (
      <div>
        <br></br>
        <h1>Examples:</h1>
        {/* <StyledButton onClick={() => handleClick('type')}  filter = "hue-rotate(90deg)">type error</StyledButton> */}
        <StyledButton onClick={() => handleClick('sum')} >sum_of_first_n_squares</StyledButton>
        <StyledButton onClick={() => handleClick('hex')} filter = "hue-rotate(120deg)">hex digit to integer</StyledButton>
        <StyledButton onClick={() => handleClick('fizz')} filter = "hue-rotate(170deg)">fizzbuzz</StyledButton>
      </div>
    );
}
  
export default ExamplePicker;