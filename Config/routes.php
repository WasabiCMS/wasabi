<?php
/**
 * Routes configuration
 *
 * In this file, you set up routes to your controllers and their actions.
 * Routes are very important mechanism that allows you to freely connect
 * different urls to chosen controllers and their actions (functions).
 *
 * PHP 5
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Config
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

	if (Configure::read('Wasabi.installed') === false) {
		Router::connect('/backend/install', array('plugin' => 'core', 'controller' => 'core_install', 'action' => 'check'));
		Router::connect('/backend/install/:action/*', array('plugin' => 'core', 'controller' => 'core_install'));

		$request = Router::getRequest();
		if (strpos($request->url, 'install') === false) {
			$url = array('plugin' => 'core', 'controller' => 'core_install', 'action' => 'check');
			Router::redirect('/*', $url, array('status' => 307));
		}
	} else {
		Router::connect('/backend/install/finish', array('plugin' => 'core', 'controller' => 'core_install', 'action' => 'finish'));
		WasabiEventManager::trigger(new stdClass(), 'Plugin.Routes.load');

		// add WasabiRoute class to handle routes saved in DB
		App::uses('WasabiRoute', 'Core.Routing/Route');
		Router::connect('/', array(), array('routeClass' => 'WasabiRoute'));
	}

/**
 * Load the CakePHP default routes. Only remove this if you do not want to use
 * the built-in default routes.
 */
	require CAKE . 'Config' . DS . 'routes.php';
