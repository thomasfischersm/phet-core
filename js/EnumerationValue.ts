// Copyright 2021-2022, University of Colorado Boulder

/**
 * Base type for enumeration value instances. See https://github.com/phetsims/phet-info/blob/master/doc/phet-software-design-patterns.md#enumeration
 *
 * The pattern for PhET's Enumeration pattern is as such:
 *
 * class MyEnumeration extends EnumerationValue {
 *   static VALUE_1 = new MyEnumeration();
 *   static VALUE_2 = new MyEnumeration();
 *
 *   // Make sure this is last, once all EnumerationValues have been declared statically.
 *   static enumeration = new Enumeration( MyEnumeration );
 * }
 *
 * // Usage
 * console.log( MyEnumeration.VALUE_1 );
 * const printValue = enumValue=> {
 *   assert && assert( enumValue.enumeration.values.includes(enumValue));
 *   console.log( enumValue );
 * };
 * printValue( MyEnumeration.VALUE_2 );
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';
import Enumeration from './Enumeration.js';
import Constructor from './types/Constructor.js';

class EnumerationValue {

  // null until set by Enumeration. Once set, cannot be changed.
  private _name: string | null;
  private _enumeration: Enumeration<this> | null;

  // After a Enumeration is constructed, no new instances of that exact type can be made (though it is OK to
  // create subtypes)
  static sealedCache = new Set<Constructor<EnumerationValue>>();

  toString() {
    return this.name;
  }

  // This method is unused, but needs to remain here so other types don't accidentally structurally match
  // enumeration values.  Without this, string satisfies the EnumerationValue interface, but we don't want it to.
  private isEnumerationValue() {return true;}

  constructor() {
    const c = this.constructor as Constructor<EnumerationValue>;
    assert && assert( !EnumerationValue.sealedCache.has( c ), 'cannot create instanceof of a sealed constructor' );

    this._name = null;
    this._enumeration = null;
  }

  set name( name: string ) {
    assert && assert( !this._name, 'name cannot be changed once defined.' );
    this._name = name;
  }

  get name(): string {
    assert && assert( this._name, 'name cannot be retreived until it has been filled in by Enumeration.' );
    return this._name!;
  }

  set enumeration( enumeration: Enumeration<this> ) {
    assert && assert( !this._enumeration, 'enumeration cannot be changed once defined.' );
    this._enumeration = enumeration;
  }

  get enumeration(): Enumeration<this> {
    assert && assert( this._enumeration, 'enumeration cannot be retreived until it has been filled in by Enumeration.' );
    return this._enumeration!;
  }
}

phetCore.register( 'EnumerationValue', EnumerationValue );

export default EnumerationValue;