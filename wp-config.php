<?php
/** 
 * As configurações básicas do WordPress.
 *
 * Esse arquivo contém as seguintes configurações: configurações de MySQL, Prefixo de Tabelas,
 * Chaves secretas, Idioma do WordPress, e ABSPATH. Você pode encontrar mais informações
 * visitando {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. Você pode obter as configurações de MySQL de seu servidor de hospedagem.
 *
 * Esse arquivo é usado pelo script ed criação wp-config.php durante a
 * instalação. Você não precisa usar o site, você pode apenas salvar esse arquivo
 * como "wp-config.php" e preencher os valores.
 *
 * @package WordPress
 */


// ** Configurações do MySQL - Você pode pegar essas informações com o serviço de hospedagem ** //
/** O nome do banco de dados do WordPress */
define('DB_NAME', 'plano076_6');

/** Usuário do banco de dados MySQL */
define('DB_USER', 'plano076_admin');

/** Senha do banco de dados MySQL */
define('DB_PASSWORD', 'admin123');

/** nome do host do MySQL */
define('DB_HOST', 'localhost');

/** Conjunto de caracteres do banco de dados a ser usado na criação das tabelas. */
define('DB_CHARSET', 'utf8mb4');

/** O tipo de collate do banco de dados. Não altere isso se tiver dúvidas. */
define('DB_COLLATE', '');
define('WP_HOME','http://hapvidaplanosdesaude.com.br');
define('WP_SITEURL','http://hapvidaplanosdesaude.com.br');

/**#@+
 * Chaves únicas de autenticação e salts.
 *
 * Altere cada chave para um frase única!
 * Você pode gerá-las usando o {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * Você pode alterá-las a qualquer momento para desvalidar quaisquer cookies existentes. Isto irá forçar todos os usuários a fazerem login novamente.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'V!;?(7Qh#Dzrm;Pf:_{{$UIZI:OVZhRI?GdJfOim)NA+Vz<v4H-{E-%}UMS!(,NX');
define('SECURE_AUTH_KEY',  'Z(RV/N3++[zv-o].2&v{4Zk{XIFYHWRj[-+}abB2[|^VuJL9|+>?LIE5cO#|B0-}');
define('LOGGED_IN_KEY',    'PKFC?Z-O62;yuF*P^bI<#?|E%Li3zCh%~<$wNN4-Epu|3[b&V} +`se]b!kNKW4l');
define('NONCE_KEY',        'Sk]n|A1&h}i~GZSIjMtolw|>0?[V>gXC]L]jQbB|Vpdxa+uIvj7!.[{hyo0k/HhD');
define('AUTH_SALT',        'd*upD!I&e;.wFp|yH|qJP~t!3Qfk-:inWx0gSW}&5-?STqe,FV %g{[I|5{Xf`(f');
define('SECURE_AUTH_SALT', '$JICs.jNLcoM*WEe]@Q,EG fpwTyuP=aN~->W.HFvWMhG48qK]RnvfQf{Ey|d[=x');
define('LOGGED_IN_SALT',   'yG+hh+1]K2BhR]tA69r$lN^=arEGmq1<BH-AtQ$}Hi|]d)2Z+iJ2/~_4SNerA1mX');
define('NONCE_SALT',       'u]aAS{`lR6^n^W9WRK#N5hT,*@)MAB3d(;-+-<2luV-Wd~@j3N^pS$k5PyZt(&fe');


/**#@-*/

/**
 * Prefixo da tabela do banco de dados do WordPress.
 *
 * Você pode ter várias instalações em um único banco de dados se você der para cada um um único
 * prefixo. Somente números, letras e sublinhados!
 */
$table_prefix  = 'wp_';


/**
 * Para desenvolvedores: Modo debugging WordPress.
 *
 * altere isto para true para ativar a exibição de avisos durante o desenvolvimento.
 * é altamente recomendável que os desenvolvedores de plugins e temas usem o WP_DEBUG
 * em seus ambientes de desenvolvimento.
 */
define('WP_DEBUG', false);


/* Isto é tudo, pode parar de editar! :) */

define('WP_ALLOW_MULTISITE', true);

/** Caminho absoluto para o diretório WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');
	
/** Configura as variáveis do WordPress e arquivos inclusos. */
require_once(ABSPATH . 'wp-settings.php');
