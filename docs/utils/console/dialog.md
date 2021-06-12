<package-info :package="package" showsbu2></package-info>

<script>
		new Vue({
		el: '#main',
		data: { package: {} },
		mounted: function () {
				this.getPackage('dialog');
		},
		methods: {
			getPackage: function(name) {
					getPackage(name)
					.then(response => this.package = response);
			},
		}
  })
</script>

## Настройка
<package-script :package="'dialog'" :type="'prepare'"></package-script>

### Объяснение новых команд
* `--enable-nls` - использовать нативную поддержку языка
* `--disable-rpatch-hack` - не добавлять опции `rpatch` для дополнительных библиотек.

## Сборка
<package-script :package="'dialog'" :type="'build'"></package-script>

## Установка
<package-script :package="'dialog'" :type="'install'"></package-script>

## Установленные файлы
* **Установленные программы:** dialog
* **Установленные библиотеки:** 
* **Установленные директории:** /usr/share/doc/dialog
