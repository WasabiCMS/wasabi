<?php
/**
 * @var CoreView $this
 * @var array $languages
 */
?>
<div class="round-shadow">
	<div class="title-pad">
		<h1><?php echo __d('core', 'All Languages') ?></h1>
		<ul class="actions">
			<li><?php echo $this->CHtml->backendLink(__d('core', 'Add a new Language'), '/languages/add', array('class' => 'add', 'title' => __d('core', 'Add a new Language'))) ?></li>
		</ul>
	</div>
	<?php echo $this->Form->create('Language', array('url' => array('plugin' => 'core', 'controller' => 'languages', 'action' => 'sort'))); ?>
	<table id="languages" class="list bottom-round">
		<thead>
		<tr>
			<th class="t1 center">ID</th>
			<th class="t4"><?php echo __d('core', 'Language') ?></th>
			<th class="t2"><?php echo __d('core', 'Locale') ?></th>
			<th class="t2"><?php echo __d('core', 'ISO') ?></th>
			<th class="t2"><?php echo __d('core', 'lang') ?></th>
			<th class="t3"><?php echo __d('core', 'Availability') ?></th>
			<th class="t2 center"><?php echo __d('core', 'Actions') ?></th>
		</tr>
		</thead>
		<tbody>
		<?php
		$i = 1;
		foreach($languages as $lang) {
			$class = ($i % 2 == 0) ? ' class="even"' : '';
			?>
			<tr<?php echo $class ?>>
				<td class="right">
					<?php
					echo $this->Form->input('Language.'.$i.'.id', array('type' => 'hidden', 'value' => $lang['Language']['id']));
					echo $this->Form->input('Language.'.$i.'.position', array('type' => 'hidden', 'value' => $lang['Language']['position'], 'class' => 'position'));
					echo $lang['Language']['id'];
					?>
				</td>
				<td><?php echo $this->CHtml->backendLink($lang['Language']['name'], '/languages/edit/' . $lang['Language']['id'], array('title' => __d('core', 'Edit this Language'))) ?></td>
				<td><?php echo $lang['Language']['locale'] ?></td>
				<td><?php echo $lang['Language']['iso'] ?></td>
				<td><?php echo $lang['Language']['lang'] ?></td>
				<td>
					<?php
					$avail_class = '';
					if ($lang['Language']['available_at_frontend'] === true) {
						$avail_class = ' label-info';
					}
					?>
					<span class="label<?php echo $avail_class; ?>">Frontend</span>
					<?php
					$avail_class = '';
					if ($lang['Language']['available_at_backend'] === true) {
						$avail_class = ' label-info';
					}
					?>
					<span class="label<?php echo $avail_class; ?>">Backend</span>
				</td>
				<td class="actions center">
					<?php
					echo $this->Html->link(__d('core', 'Change the position of this Language'), '#', array('title' => __d('core', 'Change the position of this Language'), 'class' => 'sort'));
					if (!in_array($lang['Language']['id'], array(1, 2))) {
						echo $this->CHtml->backendConfirmationLink(__d('core', 'Delete this Language'), '/languages/delete/' . $lang['Language']['id'], array(
							'title' => __d('core', 'Delete this Language'),
							'class' => 'remove',
							'confirm-message' => __d('core', 'Delete language <strong>%s</strong> ?', array($lang['Language']['name'])),
							'confirm-title' => __d('core', 'Deletion Confirmation')
						));
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
	<?php echo $this->Form->end(); ?>
</div>