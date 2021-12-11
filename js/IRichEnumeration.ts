// Copyright 2021, University of Colorado Boulder

/**
 * Abstraction used by RichEnumerationProperty, and implemented by RichEnumeration.ts
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
type IRichEnumeration<T> = {

  // The possible keys for the enumeration
  keys: string[];

  // The values for the enumeration
  values: T[];

  // Optional PhET-iO documentation
  phetioDocumentation?: string;

  // Lookup a value for a key
  getValue( k: string ): T;

  // Reverse-lookup, find the key for the value, for PhET-iO deserialization
  getKey( t: T ): string;
};

export default IRichEnumeration;