// Copyright 2018-2020, University of Colorado Boulder

/**
 * IO Type for phet-core Enumeration that supports serializing and deserializing values. Cannot be moved to the core
 * type since Enumeration must be defined before ValidatorDef can be defined.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import IOType from '../../tandem/js/types/IOType.js';
import Enumeration from './Enumeration.js';
import phetCore from './phetCore.js';

// {Map.<enumeration:Enumeration, IOType>} - Cache each parameterized EnumerationIO so that it is only created once.
const cacheMap = new Map();

// TODO https://github.com/phetsims/tandem/issues/212 move to core file?
/**
 * This caching implementation should be kept in sync with the other parametric IO Type caching implementations.
 * @param {Enumeration} enumeration
 * @returns {IOType}
 */
const EnumerationIO = enumeration => {
  assert && assert( enumeration, 'enumeration must be supplied' );
  assert && assert( enumeration instanceof Enumeration, 'enumeration must be an Enumeration' );

  if ( !cacheMap.has( enumeration ) ) {
    const toStateObjectImpl = v => v.name;
    const valueNames = enumeration.VALUES.map( toStateObjectImpl );

    // Enumeration supports additional documentation, so the values can be described.
    const additionalDocs = enumeration.phetioDocumentation ? ` ${enumeration.phetioDocumentation}` : '';

    cacheMap.set( enumeration, new IOType( `EnumerationIO(${valueNames.join( '|' )})`, {
      valueType: enumeration,
      documentation: `Possible values: ${valueNames}.${additionalDocs}`,
      toStateObject: value => toStateObjectImpl( value ),
      fromStateObject: stateObject => {
        assert && assert( typeof stateObject === 'string', 'unsupported EnumerationIO value type, expected string' );
        assert && assert( enumeration.KEYS.indexOf( stateObject ) >= 0, `Unrecognized value: ${stateObject}` );
        return enumeration[ stateObject ];
      }
    } ) );
  }

  return cacheMap.get( enumeration );
};

phetCore.register( 'EnumerationIO', EnumerationIO );
export default EnumerationIO;