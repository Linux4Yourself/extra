<pkg :name="'linux-pam'" instsize showsbu></pkg>

## Подготовка

Если вы собираетесь пересобирать документацию, исправьте некорректное обнаружение ``linx``:

<package-script :package="'linux-pam'" :type="'prepare'"></package-script>

## Настройка
<package-script :package="'linux-pam'" :type="'configure'"></package-script>

## Сборка
<package-script :package="'linux-pam'" :type="'build'"></package-script>

<!-- тестирование из за скриптов и packages хз как сделать, там есть вещи нужные только для 1 установки -->

## Установка
<package-script :package="'linux-pam'" :type="'install'"></package-script>
 
## Настройка

Создайте несколько общих файлов и ограничивающий файл ``/etc/pam.d/other``:
<package-script :package="'linux-pam'" :type="'postinstall'"></package-script>

Информацию о расширенной настройки PAM можно найти на его официальном сайте - http://www.linux-pam.org/Linux-PAM-html/Linux-PAM_SAG.html

## Установленные файлы

Программы: `faillock, mkhomedir_helper, pam_namespace_helper, pam_timestamp_check, pwhistory_helper, unix_chkpwd и unix_update`

Библиотеки: `libpam.so, libpamc.so и libpam_misc.so`

Директории: `/etc/security`, `/lib/security`, `/usr/include/security`

<script>
	new Vue({ el: '#main' })
</script> 
