package edu.nd.dronology.core.utilities;

import static org.junit.Assert.*;

import org.apache.commons.math3.geometry.euclidean.threed.Vector3D;
import org.apache.commons.math3.linear.Array2DRowRealMatrix;
import org.apache.commons.math3.linear.RealMatrix;
import org.junit.Test;

import edu.nd.dronology.core.coordinate.AbstractPosition;
import edu.nd.dronology.core.coordinate.LlaCoordinate;

public class TestAbstractPosition {

	private static final double EPSILON = 0.0000000001;
	private static final double EPSILON2 = 0.005;

	@Test
	public void testFindNed() {
		double x = 12.24;
		double y = 18.3;
		LlaCoordinate s = new LlaCoordinate(y, x, 0);
		LlaCoordinate t = new LlaCoordinate(y, x + 0.004, 0);
		Vector3D ned = s.findNed(t);
//		System.out.println(ned);
//		System.out.println(s.findLla(ned));
//		System.out.println(t);
	}

	/*
	 * Each NED test should do 2 things. It should make sure the NED coordinates
	 * are correct and it should make sure that going back to LLA from NED is
	 * correct
	 */
	@Test
	public void testNed() {
		double northExpected = 0;
		double eastExpected = 0;
		double downExpected = 0;
		LlaCoordinate a = new LlaCoordinate(0, 0, 0);
		LlaCoordinate b = new LlaCoordinate(0, 0, 0);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON);
		assertEquals(eastExpected, ned.getY(), EPSILON);
		assertEquals(downExpected, ned.getZ(), EPSILON);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON);
	}

	@Test
	public void testNed1() {
		double northExpected = 0.0004210013966812198304978664964437484741210937500000;
		double eastExpected = 96.4864313962120121459520305506885051727294921875000000;
		double downExpected = 0.0007291958091037997746752807870507240295410156250000;
		LlaCoordinate a = new LlaCoordinate(30.0000000000000000000000000000000000000000000000000000,
				20.0000000000000000000000000000000000000000000000000000,
				10.0000000000000000000000000000000000000000000000000000);
		LlaCoordinate b = new LlaCoordinate(30.0000000000000000000000000000000000000000000000000000,
				20.0010000000000012221335055073723196983337402343750000,
				10.0000000000000000000000000000000000000000000000000000);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testNed2() {
		double northExpected = -0.0000000002153797140636015683412551879882812500000000;
		double eastExpected = -0.0000000000060822458181064575910568237304687500000000;
		double downExpected = 439.9999999997825739228574093431234359741210937500000000;
		LlaCoordinate a = new LlaCoordinate(37.6002420000000014965735317673534154891967773437500000,
				-122.4298959999999993897290551103651523590087890625000000,
				440.0000000000000000000000000000000000000000000000000000);
		LlaCoordinate b = new LlaCoordinate(37.6002420000000014965735317673534154891967773437500000,
				-122.4298959999999993897290551103651523590087890625000000,
				0.0000000000000000000000000000000000000000000000000000);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testNed3() {
		double northExpected = 431.2306148905269083115854300558567047119140625000000000;
		double eastExpected = -379.0204788415589973737951368093490600585937500000000000;
		double downExpected = 0.0258671343935361619514878839254379272460937500000000;
		LlaCoordinate a = new LlaCoordinate(37.6002420000000014965735317673534154891967773437500000,
				-122.4298959999999993897290551103651523590087890625000000,
				440.0000000000000000000000000000000000000000000000000000);
		LlaCoordinate b = new LlaCoordinate(37.6041269999999983042471285443753004074096679687500000,
				-122.4341880000000060135789681226015090942382812500000000,
				440.0000000000000000000000000000000000000000000000000000);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testNed4() {
		double northExpected = 96.9660677025763817482584272511303424835205078125000000;
		double eastExpected = -4.4951683697038173903592905844561755657196044921875000;
		double downExpected = -0.0772596944661927409470081329345703125000000000000000;
		LlaCoordinate a = new LlaCoordinate(41.6979660000000009745235729496926069259643554687500000,
				-86.2340059999999937190295895561575889587402343750000000,
				275.5230000000000245563569478690624237060546875000000000);
		LlaCoordinate b = new LlaCoordinate(41.6988389999999995438884070608764886856079101562500000,
				-86.2340599999999994906829670071601867675781250000000000,
				275.6009999999999990905052982270717620849609375000000000);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testNed5() {
		double northExpected = 6356752.3142451792955398559570312500000000000000000000000000;
		double eastExpected = 0.0000000000000000000000000000000000000000000000000000;
		double downExpected = 6378137.0000000009313225746154785156250000000000000000000000;
		LlaCoordinate a = new LlaCoordinate(0.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000);
		LlaCoordinate b = new LlaCoordinate(90.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testNed6() {
		double northExpected = -6356752.3142451792955398559570312500000000000000000000000000;
		double eastExpected = 0.0000000000000000000000000000000000000000000000000000;
		double downExpected = 6378137.0000000009313225746154785156250000000000000000000000;
		LlaCoordinate a = new LlaCoordinate(0.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000);
		LlaCoordinate b = new LlaCoordinate(-90.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testNed7() {
		double northExpected = 0.0000000000000000000000000000000000000000000000000000;
		double eastExpected = 0.0000000007810965061573302778924622925284769470177793;
		double downExpected = 12756274.0000000018626451492309570312500000000000000000000000;
		LlaCoordinate a = new LlaCoordinate(0.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000);
		LlaCoordinate b = new LlaCoordinate(0.0000000000000000000000000000000000000000000000000000,
				180.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testNed8() {
		double northExpected = 0.0000000000000000000000000000000000000000000000000000;
		double eastExpected = 6378137.0000000009313225746154785156250000000000000000000000;
		double downExpected = 6378137.0000000009313225746154785156250000000000000000000000;
		LlaCoordinate a = new LlaCoordinate(0.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000);
		LlaCoordinate b = new LlaCoordinate(0.0000000000000000000000000000000000000000000000000000,
				90.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testNed9() {
		double northExpected = 0.0000000000000000000000000000000000000000000000000000;
		double eastExpected = -6378137.0000000009313225746154785156250000000000000000000000;
		double downExpected = 6378137.0000000009313225746154785156250000000000000000000000;
		LlaCoordinate a = new LlaCoordinate(0.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000);
		LlaCoordinate b = new LlaCoordinate(0.0000000000000000000000000000000000000000000000000000,
				-90.0000000000000000000000000000000000000000000000000000,
				0.0000000000000000000000000000000000000000000000000000);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testNed10() {
		double northExpected = 2066.1630647435013088397681713104248046875000000000000000;
		double eastExpected = -190.4227875552502382561215199530124664306640625000000000;
		double downExpected = 0.3384805124719605373684316873550415039062500000000000;
		LlaCoordinate a = new LlaCoordinate(37.8109269999999995093276083935052156448364257812500000,
				-122.4775419999999996889528119936585426330566406250000000,
				76.2000000000000028421709430404007434844970703125000000);
		LlaCoordinate b = new LlaCoordinate(37.8295419999999964488779369276016950607299804687500000,
				-122.4797049999999956071405904367566108703613281250000000,
				76.2000000000000028421709430404007434844970703125000000);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testNed11() {
		double northExpected = 533.1862234204299966222606599330902099609375000000000000;
		double eastExpected = 332.0479342412079972746141720563173294067382812500000000;
		double downExpected = -4.9689993526169189408392412588000297546386718750000000;
		LlaCoordinate a = new LlaCoordinate(-33.8575459999999992533048498444259166717529296875000000,
				151.2152529999999899246176937595009803771972656250000000,
				3.0000000000000000000000000000000000000000000000000000);
		LlaCoordinate b = new LlaCoordinate(-33.8527389999999996916812960989773273468017578125000000,
				151.2188409999999976207618601620197296142578125000000000,
				8.0000000000000000000000000000000000000000000000000000);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testNed12() {
		double northExpected = 29513.0208067589883285108953714370727539062500000000000000;
		double eastExpected = 69448.8442556710942881181836128234863281250000000000000000;
		double downExpected = 449.2381543573665112489834427833557128906250000000000000;
		LlaCoordinate a = new LlaCoordinate(34.0084730000000021732375898864120244979858398437500000,
				-120.0469190000000025975168682634830474853515625000000000,
				9.0000000000000000000000000000000000000000000000000000);
		LlaCoordinate b = new LlaCoordinate(34.2722320000000024720065994188189506530761718750000000,
				-119.2927490000000005920810508541762828826904296875000000,
				6.0000000000000000000000000000000000000000000000000000);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testNed13() {
		double northExpected = 903.8185348586144982618861831724643707275390625000000000;
		double eastExpected = 1128.7957148820189559046411886811256408691406250000000000;
		double downExpected = -1.2760642987232131417840719223022460937500000000000000;
		LlaCoordinate a = new LlaCoordinate(40.7820809999999980277607392054051160812377929687500000,
				-73.9690949999999958208718453533947467803955078125000000,
				64.7699999999999960209606797434389591217041015625000000);
		LlaCoordinate b = new LlaCoordinate(40.7902190000000004488356353249400854110717773437500000,
				-73.9557209999999969340933603234589099884033203125000000,
				66.2099999999999937472239253111183643341064453125000000);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testNed14() {
		double northExpected = 231.5480231838842541947087738662958145141601562500000000;
		double eastExpected = -469.4153231960073640038899611681699752807617187500000000;
		double downExpected = 4.0214437249378107708253082819283008575439453125000000;
		LlaCoordinate a = new LlaCoordinate(51.4172810000000026775524020195007324218750000000000000,
				-0.0674239999999999978230746933149930555373430252075195,
				62.0000000000000000000000000000000000000000000000000000);
		LlaCoordinate b = new LlaCoordinate(51.4193619999999995684447640087455511093139648437500000,
				-0.0741720000000000018181012251261563505977392196655273,
				58.0000000000000000000000000000000000000000000000000000);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testNed15() {
		double northExpected = -1653.4837700961847986036445945501327514648437500000000000;
		double eastExpected = -4098.3908212053047463996335864067077636718750000000000000;
		double downExpected = 8.5287863614503294229507446289062500000000000000000000;
		LlaCoordinate a = new LlaCoordinate(48.8730580000000003337845555506646633148193359375000000,
				2.3500440000000000217994511331198737025260925292968750,
				22.0000000000000000000000000000000000000000000000000000);
		LlaCoordinate b = new LlaCoordinate(48.8581760000000002719389158301055431365966796875000000,
				2.2941919999999997870077095285523682832717895507812500,
				15.0000000000000000000000000000000000000000000000000000);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testNed16() {
		double northExpected = -618.5387868498007719608722254633903503417968750000000000;
		double eastExpected = 3809.6486743787941122718621045351028442382812500000000000;
		double downExpected = 1.5673500078306403793249046429991722106933593750000000;
		LlaCoordinate a = new LlaCoordinate(22.3046700000000015506884665228426456451416015625000000,
				114.1919840000000050395101425237953662872314453125000000,
				2.0000000000000000000000000000000000000000000000000000);
		LlaCoordinate b = new LlaCoordinate(22.2990800000000000125055521493777632713317871093750000,
				114.2289549999999991314325598068535327911376953125000000,
				1.6000000000000000888178419700125232338905334472656250);
		Vector3D ned = a.findNed(b);
		assertEquals(northExpected, ned.getX(), EPSILON2);
		assertEquals(eastExpected, ned.getY(), EPSILON2);
		assertEquals(downExpected, ned.getZ(), EPSILON2);
		LlaCoordinate b2 = a.findLla(ned);
		assertEquals(b.getLatitude(), b2.getLatitude(), EPSILON);
		assertEquals(b.getLongitude(), b2.getLongitude(), EPSILON);
		assertEquals(b.getAltitude(), b2.getAltitude(), EPSILON2);
	}

	@Test
	public void testRotMat() {
		LlaCoordinate t = new LlaCoordinate(0, 0, 0);
		RealMatrix r = t.toRotMatrix();
		RealMatrix e = new Array2DRowRealMatrix(new double[][] { { 0, 0, 1. }, { 0, 1., 0 }, { -1., 0, 0 } });
		assertEquals(e, r);

	}

	// @Test
	// public void testRotMat2() {
	// RealMatrix e = new Array2DRowRealMatrix(new double[][]{{-0.17364818, 0,
	// 0.98480775}, {0., 1., 0.}, {-0.98480775, 0., -0.17364818}});
	// LlaCoordinate t = new LlaCoordinate(10, 0, 0);
	// RealMatrix r = t.toRotMatrix();
	//// printMatrix(e);
	//// System.out.println();
	//// System.out.println("actual");
	//// printMatrix(r);
	// checkMatrix(e, r);
	//
	// }

	/*
	 * Tests rot mat 3 - 22 were generated
	 */
	@Test
	public void testRotMat3() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ -0.203368321537900104134521939158730674535036087036132812,
						-0.043227271178699552822699558873864589259028434753417969,
						0.978147600733805688832944724708795547485351562500000000 },
				{ -0.207911690817759342575499204031075350940227508544921875,
						0.978147600733805577810642262193141505122184753417968750,
						0.000000000000000000000000000000000000000000000000000000 },
				{ -0.956772728821300599832966327085159718990325927734375000,
						-0.203368321537900131890097554787644185125827789306640625,
						-0.207911690817759342575499204031075350940227508544921875 } });
		LlaCoordinate t = new LlaCoordinate(12.000000, 12.000000, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat4() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ -0.019944971064355027090542193946021143347024917602539062,
						-0.189763723735197481490288851091463584452867507934570312,
						0.981627183447664086735073851741617545485496520996093750 },
				{ -0.994521895368273400883651902404380962252616882324218750,
						0.104528463267653470847307062285835854709148406982421875,
						0.000000000000000000000000000000000000000000000000000000 },
				{ -0.102607980987539273987074750493775354698300361633300781,
						-0.976249727027390545863738680054666474461555480957031250,
						-0.190808995376544832112131189205683767795562744140625000 } });
		LlaCoordinate t = new LlaCoordinate(11.000000, 84.000000, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat5() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ -0.357775509841357253204563448889530263841152191162109375,
						-0.370487385972601557249106463132193312048912048339843750,
						0.857167300702112333610216410306748002767562866210937500 },
				{ 0.719339800338651080835461470996960997581481933593750000,
						-0.694658370458997365126663225964875891804695129394531250,
						0.000000000000000000000000000000000000000000000000000000 },
				{ 0.595438440316466754964608298905659466981887817382812500,
						0.616594554943877937169816050300141796469688415527343750,
						0.515038074910054155530758634995436295866966247558593750 } });
		LlaCoordinate t = new LlaCoordinate(-31.000000, -134.000000, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat6() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ 0.358538053917704546691425093740690499544143676757812500,
						0.568657395565251078117796623700996860861778259277343750,
						0.740323733485460433456637474591843783855438232421875000 },
				{ 0.845901005079679246811963366781128570437431335449218750,
						-0.533339938130634072521729649452026933431625366210937500,
						0.000000000000000000000000000000000000000000000000000000 },
				{ 0.394844214213775468458322848164243623614311218261718750,
						0.626240590239691474749861299642361700534820556640625000,
						-0.672250525948585031521531618636799976229667663574218750 } });
		LlaCoordinate t = new LlaCoordinate(42.241000, -122.231400, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat7() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ -0.043691794009462582570879618515391484834253787994384766,
						0.663767197568014388764368050033226609230041503906250000,
						0.746661994860418176678251711564371362328529357910156250 },
				{ 0.997840616893064025205717371136415749788284301757812500,
						0.065681833702093281313061368109629256650805473327636719,
						0.000000000000000000000000000000000000000000000000000000 },
				{ -0.049042128978095213265309126882129930891096591949462891,
						0.745049665562125484896682792168576270341873168945312500,
						-0.665203627042923462120427302579628303647041320800781250 } });
		LlaCoordinate t = new LlaCoordinate(41.697949, -86.233997, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat8() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ 0.327136826305437944384379989060107618570327758789062500,
						0.514961504750161669363706096191890537738800048828125000,
						0.792335879220583461091109711560420691967010498046875000 },
				{ 0.844081403196915158737567708158167079091072082519531250,
						-0.536215054597618201448483432614011690020561218261718750,
						0.000000000000000000000000000000000000000000000000000000 },
				{ 0.424862426735916953735028300798148848116397857666015625,
						0.668795980735771622427421334577957168221473693847656250,
						-0.610085120700173400010157820361200720071792602539062500 } });
		LlaCoordinate t = new LlaCoordinate(37.595658, -122.426351, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat9() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ 0.351280336504590062762787283645593561232089996337890625,
						0.132529280071128408025060707586817443370819091796875000,
						0.926843090878413100597299489891156554222106933593750000 },
				{ 0.352988851830180916380186317837797105312347412109375000,
						-0.935627527643137724133737265219679102301597595214843750,
						0.000000000000000000000000000000000000000000000000000000 },
				{ 0.867179909631693779381578224274562671780586242675781250,
						0.327165278475907095323549356180592440068721771240234375,
						-0.375448911159627196632015966315520927309989929199218750 } });
		LlaCoordinate t = new LlaCoordinate(22.052061, -159.329764, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat10() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ -0.488273277212613265874097123742103576660156250000000000,
						0.268260393790054674223455322135123424232006072998046875,
						0.830436974058633259332395937235560268163681030273437500 },
				{ -0.481519177847471280262681148087722249329090118408203125,
						-0.876435554598907873291580017394153401255607604980468750,
						0.000000000000000000000000000000000000000000000000000000 },
				{ 0.727824489918517225639504886203212663531303405761718750,
						-0.399871329002854991596649369967053644359111785888671875,
						0.557112584776489061511028921813704073429107666015625000 } });
		LlaCoordinate t = new LlaCoordinate(-33.856348, 151.215331, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat11() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ -0.782703755379908217015838545194128528237342834472656250,
						0.001331979794750835516953246795424092852044850587844849,
						0.622393008591850427357883290824247524142265319824218750 },
				{ 0.001701765012477055027950711973971920087933540344238281,
						0.999998551996872819813688693102449178695678710937500000,
						0.000000000000000000000000000000000000000000000000000000 },
				{ -0.622392107364827640303417410905240103602409362792968750,
						0.001059166646031942191769070760187787527684122323989868,
						-0.782704888739034765343660637881839647889137268066406250 } });
		LlaCoordinate t = new LlaCoordinate(51.508904, -0.097504, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat12() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ 0.000000000000000000000000000000000000000000000000000000,
						0.000000000000000000000000000000000000000000000000000000,
						1.000000000000000000000000000000000000000000000000000000 },
				{ 0.000174532924313448400792381232093930520932190120220184,
						-0.999999984769129102168960798735497519373893737792968750,
						0.000000000000000000000000000000000000000000000000000000 },
				{ 0.999999984769129102168960798735497519373893737792968750,
						0.000174532924313448400792381232093930520932190120220184,
						0.000000000000000000000000000000000000000000000000000000 } });
		LlaCoordinate t = new LlaCoordinate(0.000000, -179.990000, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat13() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ 0.709731824238089226142278675979468971490859985351562500,
						-0.000000000000000086917080680618784424053213042744153044,
						0.704471956619760697471122057322645559906959533691406250 },
				{ -0.000000000000000122464679914735320717376402945839660463,
						-1.000000000000000000000000000000000000000000000000000000,
						0.000000000000000000000000000000000000000000000000000000 },
				{ 0.704471956619760697471122057322645559906959533691406250,
						-0.000000000000000086272932676346302234158303853604478929,
						-0.709731824238089226142278675979468971490859985351562500 } });
		LlaCoordinate t = new LlaCoordinate(45.213100, 180.000000, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat14() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ -0.752475450463514716759050315886270254850387573242187500,
						-0.030158619268658176659769765137752983719110488891601562,
						0.657929444647021965941746657335897907614707946777343750 },
				{ -0.040047055159757427578171018467401154339313507080078125,
						0.999197794920020476716615576151525601744651794433593750,
						0.000000000000000000000000000000000000000000000000000000 },
				{ -0.657401650304258011736635580746224150061607360839843750,
						-0.026348136761007858591687735838604567106813192367553711,
						-0.753079574723987121842583292163908481597900390625000000 } });
		LlaCoordinate t = new LlaCoordinate(48.857849, 2.295141, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat15() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ 0.444772971080827361767262573266634717583656311035156250,
						-0.376369947602119891971739207292557694017887115478515625,
						0.812725455943094754474032015423290431499481201171875000 },
				{ -0.645965833140003775625359594414476305246353149414062500,
						-0.763366322558010734766753557778429239988327026367187500,
						0.000000000000000000000000000000000000000000000000000000 },
				{ 0.620407242552562743220789798215264454483985900878906250,
						-0.524992876262370566919912562298122793436050415039062500,
						-0.582646834078834552350656394992256537079811096191406250 } });
		LlaCoordinate t = new LlaCoordinate(35.636923, 139.761871, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat16() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ 0.529553973633313690427826259110588580369949340820312500,
						0.176360258861318258682970849804405588656663894653320312,
						0.829740711369242323058870169916190207004547119140625000 },
				{ -0.315973415570039883881747755367541685700416564941406250,
						0.948768043650819126177964335511205717921257019042968750,
						0.000000000000000000000000000000000000000000000000000000 },
				{ -0.787231471463235243923861617076909169554710388183593750,
						-0.262176006608854206270109443721594288945198059082031250,
						0.558149040934823759130267717409878969192504882812500000 } });
		LlaCoordinate t = new LlaCoordinate(-33.927888, 18.419588, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat17() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ -0.708003097034292316891423979541286826133728027343750000,
						0.118415177517604108814452956721652299165725708007812500,
						0.696210787278770171226938145991880446672439575195312500 },
				{ -0.164961001937093676428247590592945925891399383544921875,
						-0.986300090155075581677124318957794457674026489257812500,
						0.000000000000000000000000000000000000000000000000000000 },
				{ 0.686672762259987079502820961351972073316574096679687500,
						-0.114847629028918707394524290066328831017017364501953125,
						0.717837404762857955731192305393051356077194213867187500 } });
		LlaCoordinate t = new LlaCoordinate(-45.876220, 170.505031, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat18() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ 0.194060753146919506839651603513630107045173645019531250,
						0.910456281971106728967413346254033967852592468261718750,
						0.365253039285642011613219892751658335328102111816406250 },
				{ -0.978030065889745281459966008696937933564186096191406250,
						0.208463882281080786773586055460327770560979843139648438,
						0.000000000000000000000000000000000000000000000000000000 },
				{ -0.076142066584449066835027508659550221636891365051269531,
						-0.357228454078966251028504075293312780559062957763671875,
						0.930908275445331501174450750113464891910552978515625000 } });
		LlaCoordinate t = new LlaCoordinate(-68.576844, 77.967653, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat19() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ -0.943528084806149469621061598445521667599678039550781250,
						-0.261252499136928162393189722934039309620857238769531250,
						0.203720114070136515405096133690676651895046234130859375 },
				{ -0.266848534469113718436972249037353321909904479980468750,
						0.963738480943708397674640764307696372270584106445312500,
						0.000000000000000000000000000000000000000000000000000000 },
				{ -0.196332913271632270024724675749894231557846069335937500,
						-0.054362413881496575440710472548744291998445987701416016,
						-0.979029169699887291677953271573642268776893615722656250 } });
		LlaCoordinate t = new LlaCoordinate(78.245414, 15.476822, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat20() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ -0.180532604787621869801839125102560501545667648315429688,
						0.627908803100211243553019357932498678565025329589843750,
						0.757059121600061502022072090767323970794677734375000000 },
				{ 0.961065717403952635145003569050459191203117370605468750,
						0.276319899447770134237600814230972900986671447753906250,
						0.000000000000000000000000000000000000000000000000000000 },
				{ -0.209190500356546182914030396204907447099685668945312500,
						0.727583567817769338859079653047956526279449462890625000,
						-0.653346375517721456027686599554726853966712951660156250 } });
		LlaCoordinate t = new LlaCoordinate(40.794382, -73.959313, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat21() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ 0.265001086887850179074632706033298745751380920410156250,
						0.493152237459906717109703322421410121023654937744140625,
						0.828598391644918552678689138701884075999259948730468750 },
				{ 0.880875223599347889624766594351967796683311462402343750,
						-0.473348540135911544091129599109990522265434265136718750,
						0.000000000000000000000000000000000000000000000000000000 },
				{ 0.392215839044086522768850500142434611916542053222656250,
						0.729891793514277797960687621525721624493598937988281250,
						-0.559843465053807887166215095930965617299079895019531250 } });
		LlaCoordinate t = new LlaCoordinate(34.044973, -118.251878, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	@Test
	public void testRotMat22() {
		RealMatrix e = new Array2DRowRealMatrix(new double[][] {
				{ 0.395258551895835807954426854848861694335937500000000000,
						0.624047860759287642551385033584665507078170776367187500,
						0.674043726055634895288903862820006906986236572265625000 },
				{ 0.844801794361288438395263256097678095102310180664062500,
						-0.535079366303679693217532076232600957155227661132812500,
						0.000000000000000000000000000000000000000000000000000000 },
				{ 0.360666889798820167190029906123527325689792633056640625,
						0.569433349249769071853677360195433720946311950683593750,
						-0.738691448011303486431700093817198649048805236816406250 } });
		LlaCoordinate t = new LlaCoordinate(47.620066, -122.349294, 0);
		RealMatrix r = t.toRotMatrix();
		checkMatrix(e, r);
	}

	public static void printMatrix(RealMatrix e) {
		for (int i = 0; i < 3; ++i) {
			StringBuffer b = new StringBuffer();
			for (int k = 0; k < 3; ++k) {
				b.append("" + e.getEntry(i, k) + "   ");
			}
			System.out.println(b.toString());
		}
	}

	private void checkMatrix(RealMatrix expected, RealMatrix actual) {
		RealMatrix e = expected;
		RealMatrix r = actual;
		for (int i = 0; i < 3; ++i)
			checkColumn(e.getColumn(i), r.getColumn(i));
	}

	private void checkColumn(double[] a, double[] b) {
		assertEquals(a.length, b.length);
		for (int i = 0; i < a.length; ++i) {
			assertEquals(a[i], b[i], EPSILON);
		}
	}

	@Test
	public void testDistance() {
		AbstractPosition a = new LlaCoordinate(41.697983, -86.234213, 261.9);
		AbstractPosition b = new LlaCoordinate(41.698808, -86.234222, 261.9);
		assertEquals(91.44, a.distance(b), 0.25);
	}

	@Test
	public void testTravelDistance() {
		AbstractPosition a = new LlaCoordinate(41.697983, -86.234213, 261.9);
		AbstractPosition b = new LlaCoordinate(41.698808, -86.234222, 261.9);
		assertEquals(91.44, a.travelDistance(b), 0.25);
	}

	@Test
	public void testDistance2() {
		AbstractPosition a = new LlaCoordinate(41.697983, -86.234213, 261.9);
		AbstractPosition b = new LlaCoordinate(41.698808, -86.234222, 261.9).toNVector();
		assertEquals(91.44, a.distance(b), 0.25);
	}

	@Test
	public void testTravelDistance2() {
		AbstractPosition a = new LlaCoordinate(41.697983, -86.234213, 261.9);
		AbstractPosition b = new LlaCoordinate(41.698808, -86.234222, 261.9).toNVector();
		assertEquals(91.44, a.travelDistance(b), 0.25);
	}

	@Test
	public void testDistance3() {
		AbstractPosition a = new LlaCoordinate(41.697983, -86.234213, 261.9).toPVector();
		AbstractPosition b = new LlaCoordinate(41.698808, -86.234222, 261.9).toPVector();
		assertEquals(91.44, a.distance(b), 0.25);
	}

	@Test
	public void testTravelDistance3() {
		AbstractPosition a = new LlaCoordinate(41.697983, -86.234213, 261.9).toNVector();
		AbstractPosition b = new LlaCoordinate(41.698808, -86.234222, 261.9);
		assertEquals(91.44, a.travelDistance(b), 0.25);
	}
}
