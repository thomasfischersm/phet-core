// Copyright 2019-2021, University of Colorado Boulder

/**
 * Either horizontal or vertical, with helper values.  Moved from Area Model Common on Nov 7, 2019
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Sam Reid (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';
import RichEnumeration from './RichEnumeration.js';

// So we don't introduce a dependency on phetcommon
type MVT = {
  modelToViewX: ( n: number ) => number;
  modelToViewY: ( n: number ) => number;
  viewToModelX: ( n: number ) => number;
  viewToModelY: ( n: number ) => number;
};

class Orientation {

  static HORIZONTAL = new Orientation( 'HORIZONTAL', 'x', 'centerX', 'left', 'right', 'rectX', 'rectWidth', 'horizontal', 'width',
    ( modelViewTransform, value ) => modelViewTransform.modelToViewX( value ),
    ( modelViewTransform, value ) => modelViewTransform.viewToModelX( value ),
    ( a: number, b: number, Vector2: any ) => new Vector2( a, b )
  );

  static VERTICAL = new Orientation( 'VERTICAL', 'y', 'centerY', 'top', 'bottom', 'rectY', 'rectHeight', 'vertical', 'height',
    ( modelViewTransform, value ) => modelViewTransform.modelToViewY( value ),
    ( modelViewTransform, value ) => modelViewTransform.viewToModelY( value ),
    ( a: number, b: number, Vector2: any ) => new Vector2( b, a )
  );

  static enum = new RichEnumeration<Orientation>( Orientation, {
    phetioDocumentation: 'Horizontal or vertical orientation'
  } );

  static VALUES = Orientation.enum.values;

  name: string;
  coordinate: string; // So you can position things like node[ orientation.coordinate ] = value
  centerCoordinate: string; // So you can center things like node[ orientation.centerCoordinate ] = value
  minSide: string; // For getting the minimal/maximal values from bounds/nodes
  maxSide: string;
  rectCoordinate: string; // For being able to handle Rectangles (x/y) and (width/height)
  rectSize: string;
  layoutBoxOrientation: string; // The name of the orientation when used for LayoutBox
  size: string;
  ariaOrientation: string; // The value of the aria-orientation attribute for this Orientation.

  // Returns the single coordinate transformed by the appropriate dimension.
  modelToView: ( m: MVT, n: number ) => number;
  viewToModel: ( m: MVT, n: number ) => number;

  // Creates a vector (primary,secondary) for horizontal orientations, and (secondary,primary) for vertical orientations.
  toVector: ( n: number, m: number, Vector2: any ) => any;

  // @ts-ignore - Assigned after instantiation, see below
  opposite: Orientation;

  private constructor( name: string, coordinate: string, centerCoordinate: string, minSide: string, maxSide: string, rectCoordinate: string,
                       rectSize: string, layoutBoxOrientation: string, size: string,
                       modelToView: ( m: MVT, n: number ) => number,
                       viewToModel: ( m: MVT, n: number ) => number, toVector: ( n: number, m: number, Vector2: any ) => any ) {
    this.name = name;
    this.coordinate = coordinate;
    this.centerCoordinate = centerCoordinate;
    this.minSide = minSide;
    this.maxSide = maxSide;
    this.rectCoordinate = rectCoordinate;
    this.rectSize = rectSize;
    this.layoutBoxOrientation = layoutBoxOrientation;
    this.size = size;
    this.ariaOrientation = layoutBoxOrientation;
    this.modelToView = modelToView;
    this.viewToModel = viewToModel;
    this.toVector = toVector;
  }

  // Necessary for computed property names
  toString() {
    return this.name;
  }
}

// Set up opposites as object references (circular)
Orientation.HORIZONTAL.opposite = Orientation.VERTICAL;
Orientation.VERTICAL.opposite = Orientation.HORIZONTAL;

phetCore.register( 'Orientation', Orientation );
export default Orientation;