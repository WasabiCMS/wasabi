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
 * @subpackage    Wasabi.Plugin.Core.Controller
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 */

App::uses('BackendAppController', 'Core.Controller');

class BrowserController extends BackendAppController {

	/**
	 * Models used by this controller
	 *
	 * @var array
	 */
	public $uses = array();

	/**
	 * notSupported action
	 * GET
	 *
	 * @return void
	 */
	public function notSupported() {
		$this->layout = 'Core.support';

		$this->set(array(
			'bodyCssClass' => array('support', 'browser'),
			'title_for_layout' => __d('core', 'Update Your Browser')
		));
	}

}
