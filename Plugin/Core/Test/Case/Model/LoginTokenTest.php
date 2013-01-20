<?php
/**
 *
 * PHP 5
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the below copyright notice.
 *
 * @copyright     Copyright 2013, Frank Förster (http://frankfoerster.com)
 * @link          http://github.com/frankfoerster/wasabi
 * @package       Wasabi
 * @subpackage    Wasabi.Plugin.Core.Test.Model
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

App::uses('CakeTestCase', 'TestSuite');
App::uses('ClassRegistry', 'Utility');

/**
 * @property LoginToken $LoginToken
 */

class LoginTokenTest extends CakeTestCase {

	public function setUp() {
		$this->LoginToken = ClassRegistry::init('Core.LoginToken');

		parent::setUp();
	}

	public function testBelongsToUser() {
		$this->assertTrue(array_key_exists('User', $this->LoginToken->belongsTo));
	}

	public function tearDown() {
		unset($this->LoginToken);

		parent::tearDown();
	}

}
