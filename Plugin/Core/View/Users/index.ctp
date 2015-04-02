<?php
/**
 * @var CoreView $this
 * @var array $users
 */

$this->Html->setTitle(__d('core', 'Users'));
$this->Html->addAction(
	$this->Html->backendLink('<i class="icon-plus"></i>', '/users/add', array('class' => 'add', 'title' => __d('core', 'Add a new User'), 'escape' => false))
);
?>
<table class="list valign-middle">
	<thead>
	<tr>
		<th class="t1 center">ID</th>
		<th class="t4"><?php echo __d('core', 'User') ?></th>
		<th class="t4"><?php echo __d('core', 'Group') ?></th>
		<th class="t4"><?php echo __d('core', 'Status') ?></th>
		<th class="t3 center"><?php echo __d('core', 'Actions') ?></th>
	</tr>
	</thead>
	<tbody>
	<?php
	$i = 1;
	foreach($users as $u) {
		$class = ($i % 2 == 0) ? ' class="even"' : '';
		?>
		<tr<?php echo $class ?>>
			<td class="right"><?php echo $u['User']['id'] ?></td>
			<td>
				<?php
				if ($u['User']['id'] == 1 && Authenticator::get('User.id') != 1) {
					echo $u['User']['username'];
				} else {
					echo $this->Html->backendLink($u['User']['username'], '/users/edit/' . $u['User']['id'], array('title' => __d('core', 'Edit this User')), true);
				}
				?>
			</td>
			<td><?php echo $u['Group']['name'] ?></td>
			<td>
				<?php
				$avail_class = '';
				$status_text = 'inactive';
				if ($u['User']['active'] === true) {
					$avail_class = ' label-info';
					$status_text = 'active';
				}
				?>
				<span class="label<?php echo $avail_class; ?>"><?php echo $status_text ?></span>
			</td>
			<td class="actions center">
				<?php
				if ($u['User']['id'] != Authenticator::get('id') && $u['User']['id'] != 1) {
					echo $this->Html->backendConfirmationLink(__d('core', 'delete'), '/users/delete/' . $u['User']['id'], array(
						'class' => 'wicon-remove',
						'title' => __d('core', 'Delete this User'),
						'confirm-message' => __d('core', 'Delete user <strong>%s</strong> ?', array($u['User']['username'])),
						'confirm-title' => __d('core', 'Deletion Confirmation')
					));
				} else {
					echo '-';
				}
				?>
			</td>
		</tr>
		<?php
		$i++;
	}
	?>
	</tbody>
</table>